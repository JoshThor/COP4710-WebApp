import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AppConfig } from './app.config';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';

/* Pages */
import { FindEventsComponent } from './find-events/find-events.component';
import { CreateEventsComponent } from './create-events/create-events.component';
import { ApproveEventsComponent } from './approve-events/approve-events.component';
import { CreateRSOComponent } from './create-rso/create-rso.component';
import {ViewRSOComponent } from './view-rso/view-rso.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        FindEventsComponent,
        CreateEventsComponent,
        ApproveEventsComponent,
        CreateRSOComponent,
        ViewRSOComponent
    ],
    providers: [
        AppConfig,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
