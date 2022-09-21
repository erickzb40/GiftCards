import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule} from '@angular/router';
import { GiftCardComponent } from './pages/admin/card/gift-card/gift-card.component';
import { CompradorFormComponent } from './pages/admin/card/comprador-form/comprador-form.component';
import { HeaderComponent } from './pages/admin/card/header/header.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard/dashboard.component';
import { CarouselComponent } from './pages/admin/card/carousel/carousel.component';
import { TablaComponent } from './pages/admin/dashboard/tabla/tabla.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CanjeComponent } from './pages/admin/canje/canje.component';
import { PdfComponent } from './pages/admin/card/pdf/pdf.component';
import { DatePipe } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    GiftCardComponent,
    CompradorFormComponent,
    HeaderComponent,
    DashboardComponent,
    CarouselComponent,
    TablaComponent,
    CanjeComponent,
    PdfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QRCodeModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule,
    FontAwesomeModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
