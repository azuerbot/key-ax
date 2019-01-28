import { NgModule, ModuleWithProviders } from '@angular/core';
import { KeyAxComponent } from './key-ax.component';
import { KeyAxDirective } from './directives/key-ax.directive';
import { KeyAxService } from './services/key-ax.service';

@NgModule({
  imports: [
  ],
  declarations: [KeyAxComponent, KeyAxDirective],
  exports: [KeyAxDirective],
  providers: [KeyAxService]
})
export class KeyAxModule {

  // static forRoot(config: CustomConfig): ModuleWithProviders {

  // }
}
