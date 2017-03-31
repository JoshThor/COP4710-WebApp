"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var app_config_1 = require("./app.config");
var index_1 = require("./_directives/index");
var index_2 = require("./_guards/index");
var index_3 = require("./_services/index");
var index_4 = require("./home/index");
var index_5 = require("./login/index");
var index_6 = require("./register/index");
/* Pages */
var find_events_component_1 = require("./find-events/find-events.component");
var create_events_component_1 = require("./create-events/create-events.component");
var approve_events_component_1 = require("./approve-events/approve-events.component");
var create_rso_component_1 = require("./create-rso/create-rso.component");
var view_rso_component_1 = require("./view-rso/view-rso.component");
/* Other */
var mydatepicker_1 = require("mydatepicker");
var core_2 = require("angular2-google-maps/core");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_1.routing,
            mydatepicker_1.MyDatePickerModule,
            core_2.AgmCoreModule.forRoot({
                apiKey: 'AIzaSyCXsG8bxccQbw17Xels5W3KzLmoP_Mfu2M'
            })
        ],
        declarations: [
            app_component_1.AppComponent,
            index_1.AlertComponent,
            index_1.EventZippyComponent,
            index_4.HomeComponent,
            index_5.LoginComponent,
            index_6.RegisterComponent,
            find_events_component_1.FindEventsComponent,
            create_events_component_1.CreateEventsComponent,
            approve_events_component_1.ApproveEventsComponent,
            create_rso_component_1.CreateRSOComponent,
            view_rso_component_1.ViewRSOComponent
        ],
        providers: [
            app_config_1.AppConfig,
            index_2.AuthGuard,
            index_3.AlertService,
            index_3.AuthenticationService,
            index_3.UserService,
            index_3.RSOService,
            index_3.EventService,
            index_3.UniversityService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map