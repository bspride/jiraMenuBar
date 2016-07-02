import { Component, OnInit, NgZone } from '@angular/core'
import { ROUTER_DIRECTIVES } from "@angular/router"
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: '../templates/app.template.html',
  styles: [require('../templates/css/app.component.css')],
  directives: ROUTER_DIRECTIVES
})
export class JiraApp implements OnInit {
  jiraUser = null

  constructor (private _authService: AuthService, private _ngZone: NgZone) {}

  ngOnInit () {
    let self = this
    console.log('init')

    this._authService.authUser$.subscribe((user) => {
      self._ngZone.run(() => {
        self.jiraUser = user
      })
    })

    this._authService.checkAuth$.subscribe((user) => {
      self.jiraUser = user
    })
  }
}