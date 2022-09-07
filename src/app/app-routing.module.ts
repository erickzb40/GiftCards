import { DashboardComponent } from './pages/admin/dashboard/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'cards', component: AdminComponent},
  {path: 'dashboard', component: DashboardComponent},
{path: '',  component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
