import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
declare var module: { id: string; }

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    private currentUser: User;
    private users: User[] = [];
    private currentTab: string = 'home';

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log("user: ", this.currentUser);
    }

    ngOnInit() {
        //this.loadAllUsers();
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    private switchTab(tab) {
      this.currentTab = tab;
    }
}
