import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DashboardService } from 'src/app/admin/dashboard.service';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import {
  CountryISO,
  SearchCountryField,
  PhoneNumberFormat
} from "ngx-intl-tel-input";
import { changePasswordCardtrigger } from 'src/app/shared/animations/animation';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [

    //annimations trigger
    changePasswordCardtrigger
  ]
})
export class AccountComponent implements OnInit , OnDestroy{
user:User;
userForm: FormGroup;
sizeVariables$: Observable<[]>
submitted: boolean = false
userSub: Subscription;

isShown = false;

separateDialCode = false;
SearchCountryField = SearchCountryField;
CountryISO = CountryISO;
PhoneNumberFormat = PhoneNumberFormat;
preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.Egypt];

  constructor(
    private fb: FormBuilder,
    private dashboardService:DashboardService, 
    private userService:UserService,
    private authService:AuthService) { }

  ngOnInit(): void {

    this.userForm = this.fb.group({
      name : ['', Validators.required],
      surname : ['', Validators.required],
      phoneNumberPrefix: ['', [Validators.required]],
      phone : ['', [Validators.required]],
      email : ['',[Validators.required, Validators.email]],
      birthday : ['', Validators.required],
      size : ['', Validators.required],
    });
    

    this.sizeVariables$ =  this.dashboardService.getAttributes()
    .pipe(
      map(attrs => { 
         let x = attrs.filter(attr => attr.attrName === 'size').map(attr => attr.variables)
         return x[0]
    }))


    // Get App User
    this.userSub = this.authService.appUser$.subscribe(user =>{
    
      if(user){
        this.user = user
        this.userForm.patchValue({name: user.name, email: user.email})
      }
    })


  }


  get f(){
    return this.userForm.controls
  }


  submit(userDate){
    this.submitted = true
    this.userService.updateUser(this.user.id, userDate)
  }



  changePassword(form:NgForm){
    if(form.invalid) return


  }


  ngOnDestroy(){
    if(this.userSub) this.userSub.unsubscribe()
  }

}
