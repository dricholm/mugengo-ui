import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreRoutingModule } from './core-routing.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UrlInterceptor } from '@app/core/interceptors/url.interceptor';
import { NavComponent } from './components/nav/nav.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AuthorizationInterceptor } from '@app/auth/interceptors/authorization.interceptor';
import { SharedModule } from '@app/shared/shared.module';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { UnauthorizedInterceptor } from '@app/auth/interceptors/unauthorized.interceptor';

@NgModule({
  declarations: [
    LandingPageComponent,
    NavComponent,
    HomePageComponent,
    NotFoundPageComponent,
  ],
  exports: [NavComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    { multi: true, provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor },
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
    },
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
    },
  ],
})
export class CoreModule {}
