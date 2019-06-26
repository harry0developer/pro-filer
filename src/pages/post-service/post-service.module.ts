import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostServicePage } from './post-service';

@NgModule({
  declarations: [
    PostServicePage,
  ],
  imports: [
    IonicPageModule.forChild(PostServicePage),
  ],
})
export class PostServicePageModule {}
