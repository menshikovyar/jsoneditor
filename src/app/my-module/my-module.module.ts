import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrizmThemeModule } from '@prizm-ui/theme';
import { PrizmConfirmPopupModule, PrizmButtonModule, PrizmInputLayoutDateModule, PrizmInputSelectModule, PrizmSwitcherModule, PrizmTreeModule } from '@prizm-ui/components';
import { PrizmSelectBaseExampleComponent } from './WindowComponent/WindowComponent';
import { PrizmSwitcherOuterLExampleComponent } from './StructureComponent/StructureComponent';
import { SettingsComponent } from './SettingsComponent/SettingsComponent';
import { PrizmComponent } from './RadiobuttonComponent/RadiobuttonComponent';
import { InputBasicExampleComponent } from './BasicexampleComponent/BasicexampleComponent';
import { TreeBaseExampleComponent } from './TreeComponent/TreeComponent';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    PrizmSwitcherOuterLExampleComponent,
    SettingsComponent,
    PrizmComponent,
    PrizmSelectBaseExampleComponent,
    InputBasicExampleComponent,
    TreeBaseExampleComponent
  ],
  imports: [
    CommonModule,
    PrizmThemeModule,
    PrizmConfirmPopupModule,
    PrizmButtonModule,
    PrizmInputLayoutDateModule,
    PrizmInputSelectModule,
    PrizmSwitcherModule,
    PrizmTreeModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    PrizmSwitcherOuterLExampleComponent,
    SettingsComponent,
    PrizmComponent,
    PrizmSelectBaseExampleComponent,
    InputBasicExampleComponent,
    TreeBaseExampleComponent,
  ],
})
export class MyModule { }
