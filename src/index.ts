import 'reflect-metadata'
import { Component, provide } from '@angular/core'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { ROUTER_DIRECTIVES } from "@angular/router"
import { APP_ROUTER_PROVIDERS } from './routes/app.routes'
import { bootstrap } from '@angular/platform-browser-dynamic'
import { SettingsComponent } from './components/settings.component'

@Component({
  selector: 'app-root',
  templateUrl: './templates/app.template.html',
  directives: ROUTER_DIRECTIVES
})
class JiraApp {

}
document.addEventListener('DOMContentLoaded', () => {
  bootstrap(JiraApp, [
    APP_ROUTER_PROVIDERS,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ])
})
