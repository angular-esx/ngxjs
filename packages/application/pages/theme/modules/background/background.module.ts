import { NgModule } from '@angular/core';

import { BackgroundComponent } from './background.component';


@NgModule({
  id: 'ngx-background',
  declarations: [BackgroundComponent],
  exports: [BackgroundComponent],
})
class BackgroundModule {}


export { BackgroundModule };
