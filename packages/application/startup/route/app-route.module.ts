import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ]),
  ],
  exports: [RouterModule],
})
class AppRouteModule {}


export { AppRouteModule };
