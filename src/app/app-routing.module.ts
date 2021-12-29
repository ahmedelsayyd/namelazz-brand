import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // { path: '', pathMatch: 'full', component: HomeComponent},
  // { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'admin/dashboard', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  {path :'admin' , redirectTo: 'admin/dashboard'},
  { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  // { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'catalog', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
    {path: '**' , redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
