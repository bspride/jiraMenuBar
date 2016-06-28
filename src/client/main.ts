import 'reflect-metadata'
import { provide } from '@angular/core'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { APP_ROUTER_PROVIDERS } from './routes/app.routes'
import { bootstrap } from '@angular/platform-browser-dynamic'
import { SettingsComponent } from './components/settings.component'
import { JiraApp } from './components/app.component'


document.addEventListener('DOMContentLoaded', () => {
  bootstrap(JiraApp, [
    APP_ROUTER_PROVIDERS,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ])
})
