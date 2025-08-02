import markdownit from 'markdown-it';

/**
 * Convert Markdown string to HTML string
 */
export function convertMarkdownToHtml(markdownString: string): string {
  if (!markdownString.trim()) {
    return '';
  }

  const md = markdownit({
    html: true, // Enable HTML tags in source
    xhtmlOut: true, // Use '/' to close single tags (<br />)
    breaks: true, // Convert '\n' in paragraphs into <br>
    linkify: true, // Autoconvert URL-like text to links
    typographer: true, // Enable some language-neutral replacement + quotes beautification
  });

  return md.render(markdownString);
}

/**
 * Print HTML content as PDF
 */
export function printHtmlAsPdf(htmlContent: string): void {
  const w = window.open();
  if (w === null) {
    return;
  }
  w.document.body.innerHTML = htmlContent;
  w.print();
}
