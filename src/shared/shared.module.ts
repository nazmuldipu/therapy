import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  imports: [CommonModule, AngularFireAuthModule],
  providers: [AuthService],
  declarations: [],
  exports: [AngularFireAuthModule]
})
export class SharedModule {}
