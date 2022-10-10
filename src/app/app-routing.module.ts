import { AuthGuard } from './pages/guard/auth.guard';
import { PdfComponent } from './pages/admin/card/pdf/pdf.component';
import { CanjeComponent } from './pages/admin/canje/canje.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'cards', component: AdminComponent,canActivate:[AuthGuard]},
  {path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
  {path: 'canje', component: CanjeComponent,canActivate:[AuthGuard]},
  {path: 'pdf/:documento', component: PdfComponent,canActivate:[AuthGuard]},
{path: '',  component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
