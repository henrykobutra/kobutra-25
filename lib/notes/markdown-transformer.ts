/**
 * Markdown to HTML transformation utilities
 * 
 * This module handles the conversion of markdown content to HTML,
 * including special processing for code blocks and syntax highlighting.
 */

import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import type { ASTNode } from '@/lib/types/note-types';

/**
 * Convert markdown content to HTML, replacing code blocks with shadcn CodeBlock placeholders
 * 
 * This function processes markdown content and transforms code blocks into special
 * placeholder elements that can be later replaced with enhanced code block components.
 * 
 * @param markdown - Raw markdown content to process
 * @returns Promise resolving to processed HTML string
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(() => {
      return (tree) => {
        // Find all pre > code elements and replace with shadcn CodeBlock placeholders
        const visit = (node: ASTNode) => {
          if (node.type === 'element' && node.tagName === 'pre') {
            const codeNode = node.children?.find((child: ASTNode) => 
              child.type === 'element' && child.tagName === 'code'
            );
            
            if (codeNode) {
              // Extract language from className
              const className = codeNode.properties?.className?.[0] || '';
              const language = className.replace('language-', '') || 'text';
              
              // Get the code content
              const codeContent = codeNode.children?.[0]?.value || '';
              
              // Replace with shadcn CodeBlock placeholder
              node.tagName = 'div';
              node.properties = {
                'data-code-block': 'true',
                'data-language': language,
                'data-code': codeContent
              };
              node.children = [{
                type: 'text',
                value: `[CODEBLOCK:${language}]${codeContent}[/CODEBLOCK]`
              }];
            }
          }
          
          if (node.children) {
            node.children.forEach(visit);
          }
        };
        
        visit(tree);
      };
    })
    .use(rehypeStringify)
    .process(markdown);
    
  return result.toString();
}
