import { Component, OnInit } from '@angular/core';
import { ColourSchemeService } from "./colour-scheme.service";

@Component({
  selector: 'app-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.css']
})
export class DarkModeComponent implements OnInit
{
  isDarkMode = true;
  theme = 'dark';

  constructor(private colorSchemeService: ColourSchemeService) { }

  ngOnInit(): void
  {
    this.theme = this.colorSchemeService.getScheme();
    this.isDarkMode = (this.theme === 'dark') ? true : false;
  }

  onDarkModeChange()
  {
    this.isDarkMode = !this.isDarkMode;
    this.theme = (this.isDarkMode) ? 'dark' : 'light';

    this.colorSchemeService.updateScheme(this.theme);
  }

}
