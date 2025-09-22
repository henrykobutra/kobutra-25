'use client';

import { useEffect } from 'react';

/**
 * Client-side handler for copy code functionality
 * Attaches click handlers to all copy buttons in code blocks
 */
export default function CopyCodeHandler() {
  useEffect(() => {
    const handleCopyClick = async (event: Event) => {
      const button = event.target as HTMLButtonElement;
      if (!button.classList.contains('copy-button')) return;

      // Find the parent code block
      const codeBlock = button.closest('.shiki');
      if (!codeBlock) return;

      // Get the code content from the pre element
      const preElement = codeBlock.querySelector('pre');
      if (!preElement) return;

      const codeText = preElement.textContent || '';

      try {
        await navigator.clipboard.writeText(codeText);
        
        // Enhanced visual feedback with success state
        const icon = button.querySelector('.copy-icon');
        if (icon) {
          const originalHTML = icon.outerHTML;
          
          // Add success class and change icon
          button.classList.add('success');
          icon.outerHTML = `
            <svg class="copy-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          `;
          
          setTimeout(() => {
            const checkIcon = button.querySelector('.copy-icon');
            if (checkIcon) {
              checkIcon.outerHTML = originalHTML;
              button.classList.remove('success');
            }
          }, 1200);
        }
      } catch (err) {
        console.error('Failed to copy code:', err);
        
        // Error feedback with red styling
        const icon = button.querySelector('.copy-icon');
        if (icon) {
          const originalHTML = icon.outerHTML;
          
          // Temporarily style as error
          button.style.background = 'oklch(0.7 0.15 12 / 20%)';
          button.style.borderColor = 'oklch(0.7 0.15 12 / 40%)';
          button.style.color = 'oklch(0.5 0.15 12)';
          
          icon.outerHTML = `
            <svg class="copy-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          `;
          
          setTimeout(() => {
            const errorIcon = button.querySelector('.copy-icon');
            if (errorIcon) {
              errorIcon.outerHTML = originalHTML;
              // Reset styles
              button.style.background = '';
              button.style.borderColor = '';
              button.style.color = '';
            }
          }, 1200);
        }
      }
    };

    // Add event listener to document for event delegation
    document.addEventListener('click', handleCopyClick);

    return () => {
      document.removeEventListener('click', handleCopyClick);
    };
  }, []);

  return null; // This component doesn't render anything
}
