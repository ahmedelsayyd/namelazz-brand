import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFaild = false
  errorMsg: string
  constructor(private authService:AuthService,) { }

  ngOnInit(): void {
  }


  login(loginForm){
    
    this.authService.loginWithEmailAndPassword(loginForm.value,false)
    .then(u => console.log(u))
    .catch(err =>{
      console.log(err.message)
      this.loginFaild = true
      this.errorMsg = err.message
      
    })
  }
}
