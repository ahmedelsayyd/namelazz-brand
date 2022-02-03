import { Injectable, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { Role } from "../models/role.model";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { User } from "../models/user.model";
import { switchMap } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { NzMessageService } from "ng-zorro-antd/message";


@Injectable({
    providedIn: 'root'
})

export class AuthService implements OnInit{

  user$: Observable<firebase.User>;
  userData: any


    constructor(
      private auth: AngularFireAuth, 
      private userService: UserService, 
      private router: Router,
      private msg: NzMessageService) { 

        this.user$ = this.auth.authState

        this.auth.authState.subscribe(user=> {
          if(user){
            localStorage.setItem('user', JSON.stringify(user));
            this.userData = JSON.parse(localStorage.getItem('user'));
            

          } else {
            localStorage.setItem('user', null);
            this.userData = JSON.parse(localStorage.getItem('user'));
          }

        })
      
    }

       
  ngOnInit(){
    
  }

    
    registerUser(userData) {
        this.auth.createUserWithEmailAndPassword(userData.email, userData.password)
            .then(data => {
                let userId = data.user.uid
                this.userService.saveUser({ id: userId, ...userData })

                this.router.navigate(['/login'])

            })
    }


    loginWithEmailAndPassword(authData, fromPopup: boolean) {
      
       return this.auth.signInWithEmailAndPassword(authData.email, authData.password).then(()=>{
        this.router.navigate(['/'])
      })

    }


    loginWithGoogle(fromPopup) {
        this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(data => {

                let userdata = {
                    id: data.user.uid,
                    name: data.user.displayName,
                    email: data.user.email,
                    role: Role.user,
                }

                this.userService.saveUser(userdata)
                if (!fromPopup) {

                    this.router.navigate(['/'])
                }
            })
    }



    loginWithFacebooke(fromPopup) {
        this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
            .then(data => {
                let userdata = {
                    id: data.user.uid,
                    name: data.user.displayName,
                    email: data.user.email,
                    role: Role.user,
                }

                this.userService.saveUser(userdata)
                if (!fromPopup) {

                    this.router.navigate(['/'])
                }


            })

    }



    logout() {
      this.auth.signOut().then(()=>{
        this.router.navigate(['login']);
        localStorage.removeItem('user');
      })
  
    }

      // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      this.msg.info('Password reset email sent, check your inbox.')

    }).catch((error) => {
      this.msg.info(error)
    })
  }



  async verifyPasswordResetCode( code: string): Promise<any> {

    return await this.auth.verifyPasswordResetCode(code)
      .then((email) => {
          return email;
      }).catch((error) => {
          console.log(error.message);
      });
  }

  
  async confirmPasswordReset(code: string, newPassword: string): Promise<boolean> {

    return await this.auth.confirmPasswordReset(code, newPassword)
        .then(() => {
          this.msg.success('Password has been reset successfully');
          return true;
        }).catch((error) => {
          this.msg.error(error.message);
          return false;
      });
  }


    
  get appUser$(): Observable<User> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) return this.userService.getUser(user.uid);

        return of(null)
      })
    )
  }


  // Returns Is Authenticated?
  get isLoggedIn(): boolean {
    return (this.userData !== null) ? true : false;
  }

//   get getToken() {
//       return this.auth.idToken
//   }


//   // Returns current user data
//   get currentUser() {
    
//     return this.isLoggedIn ? this.userData : null;
//   }
  
  
//   // Returns current user UID
//   get currentUserId(): string {      
//     return this.isLoggedIn ? this.userData?.uid : '';
//   }


//   get currentUserObservable() {
//     return this.user$
//   }



// // Anonymous User
//   get currentUserAnonymous(): boolean {
//     return this.isLoggedIn ? this.userData.isAnonymous : false
//   }


    /* 
    
      // Returns current user display name or Guest
      get currentUserDisplayName(): string {
        if (!this.userData) { return 'Guest' }
        else if (this.currentUserAnonymous) { return 'Anonymous' }
        else { return this.userData['displayName'] || 'User without a Name' }
      }
      getFirstName(fullname){
        var getSpace = fullname.search(" ");
        var FirstName = fullname.substring(0,getSpace);
        return FirstName;
      }
      get currentUserFirstName(): string {
        if (!this.userData) { return 'Guest' }
        else if (this.currentUserAnonymous) { return 'Anonymous' }
        else { return this.getFirstName(this.userData['displayName']) || 'User without a Name' }
      }
      get currentUserEmailName(): string {
        if (!this.userData) { return 'Guest' }
        else if (this.currentUserAnonymous) { return 'Anonymous' }
        else { return this.userData['email'] || 'User without a Name' }
      }
      get currentUserDisplayPicture(): string {
        if (!this.userData) { return 'Guest' }
        else if (this.currentUserAnonymous) { return 'Anonymous' }
        else { return this.userData['photoURL'] || 'User without a Name' }
      } */

}