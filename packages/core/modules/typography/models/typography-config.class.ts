export class NgxTypographyConfig {
  type: 'display-1' | 'display-2' | 'display-3' | 'display-4' | 'headline' | 'title' | 'subheading' | 'body-1' | 'body-2' | 'caption';
  fontWeight: 'light' | 'regular' | 'medium' | 'bold';
  align?: 'left' | 'right' | 'center' | 'justify' | null;
  decorator?: 'underline' | 'overline' | 'line-through' | null;
  transform?: 'capitalize' | 'uppercase' | 'lowercase' | null;
  overflow?: 'clip' | 'ellipsis' | 'string' | null;
  whiteSpace?: 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap' | null;
  wordBreak?: 'break-all' | 'keep-all' | null;
  wordWrap?: 'break-word' | null;
  color?: 'black' | 'black-87' | 'black-54' | 'black-38' | 'black-12'
  | 'white' | 'white-87' | 'white-54' | 'white-38' | 'white-12'
  | 'primary' | 'primary-light' | 'primary-dark'
  | 'accent' | 'accent-light' | 'accent-dark'
  | 'success' | 'success-light' | 'success-dark'
  | 'warn' | 'warn-light' | 'warn-dark'
  | 'danger' | 'danger-light' | 'danger-dark';
};
