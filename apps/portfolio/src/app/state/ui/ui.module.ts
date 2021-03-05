import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppUiState } from './ui.store';

@NgModule({
  imports: [NgxsModule.forFeature([AppUiState])],
})
export class AppUiStoreModule {}
