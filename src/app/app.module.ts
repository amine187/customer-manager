import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { ModalComponent } from './shared/modal/modal.component';
import { AppRoutingModule } from './app-routing.module';
import { CustomersModule } from './customers/customers.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    CustomersModule,
    PageNotFoundModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
  ],
  entryComponents: [ModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }