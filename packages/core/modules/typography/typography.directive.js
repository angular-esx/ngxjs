import {
  Directive,
  Input,
} from '@angular/core';

import { isObject } from 'ngx-infrastructure';


@Directive({
  selector: '[ngxTypography]',
  host: {
    '[attr.ngxTypography_variant_display-1]': '_isVariant("display-1")',
    '[attr.ngxTypography_variant_display-2]': '_isVariant("display-2")',
    '[attr.ngxTypography_variant_display-3]': '_isVariant("display-3")',
    '[attr.ngxTypography_variant_display-4]': '_isVariant("display-4")',
    '[attr.ngxTypography_variant_headline]': '_isVariant("headline")',
    '[attr.ngxTypography_variant_title]': '_isVariant("title")',
    '[attr.ngxTypography_variant_subheading-1]': '_isVariant("subheading-1")',
    '[attr.ngxTypography_variant_subheading-2]': '_isVariant("subheading-2")',
    '[attr.ngxTypography_variant_body-1]': '_isVariant("body-1")',
    '[attr.ngxTypography_variant_body-2]': '_isVariant("body-2")',
    '[attr.ngxTypography_variant_caption]': '_isVariant("caption")',
    '[attr.ngxTypography_type_no-leading]': '_isNoLeading',
  },
})
class ngxTypographyDirective {
  get _isNoLeading() {
    return (isObject(this.options) && this.options.isNoLeading) ? '' : null;
  }

  @Input('ngxTypography') options;

  _isVariant(variant) {
    if (!this.options) { return null; }

    if (isObject(this.options)) {
      return this.options.variant === variant ? '' : null;
    }

    return this.options === variant ? '' : null;
  }
}


export { ngxTypographyDirective };
