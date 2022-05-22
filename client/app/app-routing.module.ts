// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Services
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
// Components
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AddlawsuitComponent } from './home/addlawsuit/Addlawsuit.component';
import { LawsutitTableComponent } from './home/lawsuittable/lawsuittable.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children : [
    {path: '' , component: LawsutitTableComponent},
    {path: 'addlawsuit' , component: AddlawsuitComponent},
    {path: 'addlawsuit/:id' , component: AddlawsuitComponent},
  ], canActivate : [
    AuthGuardLogin
  ] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuardAdmin] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardAdmin] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule {}
