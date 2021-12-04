import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { TrackFocusDirective } from '../shared/directives/track-focus.directive';
import { AuthRoutingModule } from './auth-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent,
        ResetPasswordComponent
    ],

    imports: [AuthRoutingModule, FormsModule, CommonModule,SharedModule],
    exports: []
})
export class AuthModule { }