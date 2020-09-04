import { Component, OnInit } from '@angular/core';
import { ColourSchemeService } from "./colour-scheme.service";

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit
{
  themeOptions: string[] = ['Light', 'Dark', 'Detect (system)'];
  selectedOption: string = 'Dark';

  constructor(private colorSchemeService: ColourSchemeService) { }

  ngOnInit(): void
  {
    const scheme: string = this.colorSchemeService.getScheme();
    if (scheme === "light")
    {
      this.selectedOption = this.themeOptions[0];
    }
    else if (scheme === "dark")
    {
      this.selectedOption = this.themeOptions[1];
    }
    else
    {
      this.selectedOption = this.themeOptions[2];
    }
  }

  private _changeTheme()
  {
    if (this.selectedOption === "Light")
    {
      this.colorSchemeService.updateScheme("light");
    }
    else if (this.selectedOption === "Dark")
    {
      this.colorSchemeService.updateScheme("dark");
    }
    else
    {
      this.colorSchemeService.getSystemScheme();
    }
  }

  onThemeChange(selected)
  {
    this.selectedOption = selected.option.value;
    this._changeTheme();
  }

}
