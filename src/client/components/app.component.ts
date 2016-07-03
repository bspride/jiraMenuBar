import { Component, OnInit, NgZone } from '@angular/core'
import { ROUTER_DIRECTIVES, Router, NavigationEnd } from "@angular/router"
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: '../templates/app.template.html',
  styles: [require('../templates/css/app.component.css')],
  directives: ROUTER_DIRECTIVES
})
export class JiraApp implements OnInit {
  jiraUser = null

  constructor (
    private _authService: AuthService, 
    private _ngZone: NgZone,
    private _router: Router) {
      this._router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          console.log(event)
        }
      })
    }

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