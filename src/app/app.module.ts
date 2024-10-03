import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { CatSearchComponent } from './components/cat-search/cat-search.component';
import { MaterialModule } from './modules/material.module';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { CatState } from './store/cat/cat.state';

@NgModule({
  declarations: [
    AppComponent,
    CatSearchComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxsModule.forRoot([CatState]),
  ],
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([tokenInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
