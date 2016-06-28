import 'reflect-metadata'
import { Component } from '@angular/core'
import { bootstrap } from '@angular/platform-browser-dynamic'

@Component({
  selector: 'app-root',
  templateUrl: './templates/app.template.html'
})
class JiraApp {

}
document.addEventListener('DOMContentLoaded', () => {
  bootstrap(JiraApp, [])
})
