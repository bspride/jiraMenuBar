import 'reflect-metadata'
import { provide } from '@angular/core'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { APP_ROUTER_PROVIDERS } from './routes/app.routes'
import { bootstrap } from '@angular/platform-browser-dynamic'
import { disableDeprecatedForms, provideForms } from '@angular/forms'
import { JiraService } from './services/jira.service'
import { JiraApp } from './components/app.component'


document.addEventListener('DOMContentLoaded', () => {
  bootstrap(JiraApp, [
    disableDeprecatedForms(),
    provideForms(),
    APP_ROUTER_PROVIDERS,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    JiraService
  ])
})
