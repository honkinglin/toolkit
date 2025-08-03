import { format } from 'prettier';

export async function formatHtml(html: string): Promise<string> {
  try {
    // 动态导入 prettier 的 HTML 插件
    const htmlParser = await import('prettier/plugins/html');

    const formatted = await format(html, {
      parser: 'html',
      plugins: [htmlParser.default],
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
      htmlWhitespaceSensitivity: 'css',
    });

    return formatted;
  } catch (error) {
    console.error('Error formatting HTML:', error);
    return html;
  }
}
