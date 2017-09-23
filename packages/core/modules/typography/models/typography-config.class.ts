export class NgxTypographyConfig {
  type: 'display-1' | 'display-2' | 'display-3' | 'display-4' | 'headline' | 'title' | 'subheading' | 'body-1' | 'body-2' | 'caption';
  align?: 'left' | 'right' | 'center' | 'justify' | null;
  decorator?: 'underline' | 'overline' | 'line-through' | null;
  transform?: 'capitalize' | 'uppercase' | 'lowercase' | null;
  overflow?: 'clip' | 'ellipsis' | 'string' | null;
  whiteSpace?: 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap' | null;
  wordBreak?: 'break-all' | 'keep-all' | null;
  wordWrap?: 'break-word' | null;
};
