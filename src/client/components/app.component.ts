import { Component, OnInit } from '@angular/core'
import { ROUTER_DIRECTIVES } from "@angular/router"
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: '../templates/app.template.html',
  styles: [require('../templates/css/app.component.css')],
  directives: ROUTER_DIRECTIVES
})
export class JiraApp {
  jiraUser = null
  userAvatar = null

  constructor (private _authService: AuthService) {}

  ngOnInit () {
    let self = this

    self._authService.authUser$.subscribe((user) => {
      self.jiraUser = user
      self.userAvatar = self.jiraUser.avatarUrls['32x32']
    })
  }
}