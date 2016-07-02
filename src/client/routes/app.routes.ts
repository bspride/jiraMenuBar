import { provideRouter, RouterConfig } from '@angular/router'

import { SettingsComponent } from '../components/settings.component'
import { IssuesComponent } from '../components/issues.component'
import { IssueComponent } from '../components/issue.component'
import { AuthGuard } from './authGuard'

export const routes: RouterConfig = [
  { path: '', component: IssuesComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent },
  { path: 'issue/:key', component: IssueComponent, canActivate: [AuthGuard] }
]

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
]