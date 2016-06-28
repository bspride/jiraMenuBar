import { provideRouter, RouterConfig } from '@angular/router'

import { SettingsComponent } from '../components/settings.component'

export const routes: RouterConfig = [
  { path: '', component: SettingsComponent }
]

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
]