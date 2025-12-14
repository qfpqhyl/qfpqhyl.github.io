document.addEventListener('DOMContentLoaded', () => {
  const getCopyButton = () => {
    const button = document.createElement("div")
    button.innerHTML = `复制代码`
    button.className = 'copy-button'
    return button
  }

  const copyToClipboard = async (text) => {
    // Check if text is empty
    if (!text || text.trim() === '') {
      return false;
    }

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text)
        return true
      } catch (error) {
        console.error('Clipboard API failed:', error)
      }
    }

    // Fallback method
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      const result = document.execCommand('copy')
      return result
    } catch (error) {
      console.error('Fallback copy failed:', error)
      return false
    } finally {
      document.body.removeChild(textArea)
    }
  }

  const codeBlocks = document.querySelectorAll('figure.highlight')

  codeBlocks.forEach((codeBlock) => {
    const copyButton = getCopyButton();

    copyButton.onclick = async () => {
      try {
        const code = codeBlock.querySelector('code') || codeBlock;

        // Try to get text without line numbers
        let text = '';

        // First, try to get text excluding line numbers
        const lineNumbers = code.querySelector('.line');
        if (lineNumbers) {
          // If there are line numbers, get only the actual code lines
          const lines = code.querySelectorAll('.line');
          lines.forEach((line) => {
            // Remove the line number and get the actual code
            const codeText = line.textContent.replace(/^\s*\d+/, '');
            text += codeText + '\n';
          });
          text = text.trim(); // Remove trailing newline
        } else {
          // Fallback: try to filter out line numbers from the entire text
          const allText = code.innerText || code.textContent;
          text = allText.split('\n').map(line => {
            // Remove line number at the beginning of each line (e.g., "1:", "2:", etc.)
            return line.replace(/^\s*\d+[:\s]?/, '');
          }).join('\n').trim();
        }

        const success = await copyToClipboard(text);

        if (success) {
          copyButton.innerText = '已复制!'
        } else {
          copyButton.innerText = '复制失败'
        }
      } catch (error) {
        console.error('复制失败:', error);
        copyButton.innerText = '发生错误'
      } finally {
        setTimeout(() => {
          copyButton.innerText = '复制代码'
        }, 2000)
      }
    }
    codeBlock.appendChild(copyButton)
  })
})
