import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppGithubUserState } from './github-user.store';

@NgModule({
  imports: [NgxsModule.forFeature([AppGithubUserState])],
})
export class AppGithubUserModule {}
