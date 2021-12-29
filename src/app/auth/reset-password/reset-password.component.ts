import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  code:string
  constructor(
    private route :ActivatedRoute, 
    private router:Router, 
    private auth:AngularFireAuth,
    private authService: AuthService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.code = params['oobCode'];
      if (this.code) {
          this.auth.verifyPasswordResetCode(this.code)
      }
    });
  }



  // resetPassword(passwordForm: NgForm){
  //   const code = this.route.snapshot.queryParams['oobCode'];

  //   this.auth
  //     .confirmPasswordReset(code, passwordForm.value.newPass)
  //     .then(() => {
  //       // do something after successful verification
  //       this.msg.info("Password Updated Successfully")   
  //       this.router.navigate(['/login'])
  //     })
  //     .catch(err => {
  //       // show error message
  //       console.log(err);
        
  //     });
  // }





  confirmPasswordReset(passwordForm) {
    
    this.authService.confirmPasswordReset(this.code, passwordForm.value.newPass).then((result) => {
      if(result) this.router.navigate(['/login'])
        
    });
  } 
}
