import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import 'hammerjs';

// Components
import { AppComponent } from './app.component';
import { AppFeaturesComponents, AppFeaturesEntryComp } from './features/index';

// Pipes
import { AppPipes } from './features/pipes/index';

// Directives
import { AppDirectives } from './features/directives';

// Routing
import { RoutingModule } from './app.routing';

// Modules
import { AngularMaterialModule } from './angular-material.module';

// Services
import { AppServices } from './features/services';

// NgRx
import { UserEffects } from './features/store/user/user.effects';
import { reducers } from './features/store';

@NgModule({
  declarations: [AppComponent, AppFeaturesComponents, AppPipes, AppDirectives],
  imports: [
    RoutingModule,
    AngularMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({
      name: 'angular app',
      maxAge: 10,
    }),
  ],
  providers: [AppServices, AppPipes],
  bootstrap: [AppComponent],
  entryComponents: [AppFeaturesEntryComp],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
