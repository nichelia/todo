import { Component } from '@angular/core';
import { VERSION } from '../environments/version';
import { ColourSchemeService } from "./dark-mode/colour-scheme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';
  version = "v"+VERSION.version;

  constructor(private colorSchemeService: ColourSchemeService)
  {
    this.colorSchemeService.load();
  }
}
