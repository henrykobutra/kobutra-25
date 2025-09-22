'use client';

import { useEffect, useRef, useState } from 'react';
import { codeToHtml } from 'shiki';

interface CodeBlockRendererProps {
  htmlContent: string;
}

/**
 * Component that replaces code block placeholders with shadcn CodeBlock components
 */
export default function CodeBlockRenderer({ htmlContent }: CodeBlockRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const processCodeBlocks = async () => {
      // Find all code block placeholders
      const placeholders = containerRef.current?.querySelectorAll('[data-code-block="true"]');
      if (!placeholders) return;
      
      for (const placeholder of Array.from(placeholders)) {
        const language = placeholder.getAttribute('data-language') || 'text';
        const code = placeholder.getAttribute('data-code') || '';
        
        try {
          // Generate syntax highlighted HTML with Shiki (dark theme)
          const highlightedHtml = await codeToHtml(code, {
            lang: language,
            theme: 'dracula'
          });

          // Create the code block container
          const codeBlockContainer = document.createElement('div');
          codeBlockContainer.innerHTML = `
            <div class="code-block-container" style="margin-bottom: 0.75rem !important;">
              <div class="code-block-header">
                <span class="language-label">${language.toUpperCase()}</span>
                <button class="copy-button" data-code="${encodeURIComponent(code)}">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                    <path d="m4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                  </svg>
                </button>
              </div>
              <div class="code-block-content">
                ${highlightedHtml}
              </div>
            </div>
          `;

          // Replace placeholder with highlighted code block
          placeholder.parentNode?.replaceChild(codeBlockContainer, placeholder);
        } catch (error) {
          console.error(`Failed to highlight code for language "${language}":`, error);
          
          // Fallback to plain code block
          const codeBlockContainer = document.createElement('div');
          codeBlockContainer.innerHTML = `
            <div class="code-block-container" style="margin-bottom: 0.75rem !important;">
              <div class="code-block-header">
                <span class="language-label">${language.toUpperCase()}</span>
                <button class="copy-button" data-code="${encodeURIComponent(code)}">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                    <path d="m4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                  </svg>
                </button>
              </div>
              <div class="code-block-content">
                <pre><code>${escapeHtml(code)}</code></pre>
              </div>
            </div>
          `;
          placeholder.parentNode?.replaceChild(codeBlockContainer, placeholder);
        }
      }

      // Add copy functionality after all code blocks are processed
      const copyButtons = containerRef.current?.querySelectorAll('.copy-button');
      copyButtons?.forEach((button) => {
        button.addEventListener('click', async () => {
          const code = decodeURIComponent(button.getAttribute('data-code') || '');
          try {
            await navigator.clipboard.writeText(code);
            // Visual feedback
            const originalHTML = button.innerHTML;
            button.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
            `;
            setTimeout(() => {
              button.innerHTML = originalHTML;
            }, 1000);
          } catch (err) {
            console.error('Failed to copy:', err);
          }
        });
      });
    };

    processCodeBlocks();
  }, [htmlContent]);

  return (
    <div 
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

function getFileExtension(language: string): string {
  const extensions: Record<string, string> = {
    typescript: 'ts',
    javascript: 'js',
    tsx: 'tsx',
    jsx: 'jsx',
    python: 'py',
    java: 'java',
    go: 'go',
    rust: 'rs',
    php: 'php',
    ruby: 'rb',
    swift: 'swift',
    kotlin: 'kt',
    dart: 'dart',
    css: 'css',
    html: 'html',
    json: 'json',
    yaml: 'yml',
    bash: 'sh',
    sql: 'sql',
    markdown: 'md'
  };
  
  return extensions[language] || 'txt';
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
