import { provideRouter, RouterConfig } from '@angular/router'

import { SettingsComponent } from '../components/settings.component'
import { IssuesComponent } from '../components/issues.component'

export const routes: RouterConfig = [
  { path: '', component: SettingsComponent },
  { path: 'issues', component: IssuesComponent }
]

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
]