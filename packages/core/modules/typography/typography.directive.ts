import {
  Directive,
  Input,
} from '@angular/core';

import { isObject } from 'ngx-infrastructure';


@Directive({
  selector: '[ngxTypo]',
  host: {
    '[attr.ngxTypo_type_display-1]': '_hasOption("type", "display-1")',
    '[attr.ngxTypo_type_display-2]': '_hasOption("type", "display-2")',
    '[attr.ngxTypo_type_display-3]': '_hasOption("type", "display-3")',
    '[attr.ngxTypo_type_display-4]': '_hasOption("type", "display-4")',
    '[attr.ngxTypo_type_headline]': '_hasOption("type", "headline")',
    '[attr.ngxTypo_type_title]': '_hasOption("type", "title")',
    '[attr.ngxTypo_type_subheading]': '_hasOption("type", "subheading")',
    '[attr.ngxTypo_type_body-1]': '_hasOption("type", "body-1")',
    '[attr.ngxTypo_type_body-2]': '_hasOption("type", "body-2")',
    '[attr.ngxTypo_type_caption]': '_hasOption("type", "caption")',

    '[attr.ngxTypo_align_left]': '_hasOption("align", "left")',
    '[attr.ngxTypo_align_right]': '_hasOption("align", "right")',
    '[attr.ngxTypo_align_center]': '_hasOption("align", "center")',
    '[attr.ngxTypo_align_justify]': '_hasOption("align", "justify")',

    '[attr.ngxTypo_decorator_underline]': '_hasOption("decorator", "underline")',
    '[attr.ngxTypo_decorator_overline]': '_hasOption("decorator", "overline")',
    '[attr.ngxTypo_decorator_line-through]': '_hasOption("decorator", "line-through")',

    '[attr.ngxTypo_transform_capitalize]': '_hasOption("transform", "capitalize")',
    '[attr.ngxTypo_transform_uppercase]': '_hasOption("transform", "uppercase")',
    '[attr.ngxTypo_transform_lowercase]': '_hasOption("transform", "lowercase")',

    '[attr.ngxTypo_overflow_clip]': '_hasOption("overflow", "clip")',
    '[attr.ngxTypo_overflow_ellipsis]': '_hasOption("overflow", "ellipsis")',
    '[attr.ngxTypo_overflow_string]': '_hasOption("overflow", "string")',

    '[attr.ngxTypo_white-space_nowrap]': '_hasOption("whiteSpace", "nowrap")',
    '[attr.ngxTypo_white-space_pre]': '_hasOption("whiteSpace", "pre")',
    '[attr.ngxTypo_white-space_pre-line]': '_hasOption("whiteSpace", "pre-line")',
    '[attr.ngxTypo_white-space_pre-wrap]': '_hasOption("whiteSpace", "pre-wrap")',

    '[attr.ngxTypo_word-break_break-all]': '_hasOption("wordBreak", "break-all")',
    '[attr.ngxTypo_word-break_keep-all]': '_hasOption("wordBreak", "keep-all")',

    '[attr.ngxTypo_word-wrap_break-word]': '_hasOption("wordWrap", "break-word")',
  },
})
class NgxTypographyDirective {
  @Input('ngxTypo') options: string | {
    type: 'display-1' | 'display-2' | 'display-3' | 'display-4' | 'headline' | 'title' | 'subheading' | 'body-1' | 'body-2' | 'caption';
    align?: 'left' | 'right' | 'center' | 'justify' | null;
    decorator?: 'underline' | 'overline' | 'line-through' | null;
    transform?: 'capitalize' | 'uppercase' | 'lowercase' | null;
    overflow?: 'clip' | 'ellipsis' | 'string' | null;
    whiteSpace?: 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap' | null;
    wordBreak?: 'break-all' | 'keep-all' | null;
    wordWrap?: 'break-word' | null;
  };

  _hasOption (optionKey: string, optionValue: string): string {
    if (!this.options) { return null; }

    if (isObject(this.options)) {
      return this.options[optionKey] === optionValue ? '' : null;
    }

    return this.options === optionValue ? '' : null;
  }
}


export { NgxTypographyDirective };
