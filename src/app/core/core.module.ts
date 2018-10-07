import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreRoutingModule } from './core-routing.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UrlInterceptor } from '@app/core/interceptors/url.interceptor';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
  ],
})
export class CoreModule {}
