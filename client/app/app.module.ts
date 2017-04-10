import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AppConfig } from './app.config';

import { AlertComponent, EventZippyComponent, Rating } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, RSOService, EventService, UniversityService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';

/* Pages */
import { FindEventsComponent } from './find-events/find-events.component';
import { CreateEventsComponent } from './create-events/create-events.component';
import { ApproveEventsComponent } from './approve-events/approve-events.component';
import { CreateRSOComponent } from './create-rso/create-rso.component';
import { ViewRSOComponent } from './view-rso/view-rso.component';

/* Other */
import { MyDatePickerModule } from 'mydatepicker';
import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        MyDatePickerModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyCXsG8bxccQbw17Xels5W3KzLmoP_Mfu2M',
          libraries: ["places"]
        })
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        EventZippyComponent,
        Rating,
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
        UserService,
        RSOService,
        EventService,
        UniversityService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
