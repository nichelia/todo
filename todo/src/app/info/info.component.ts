import { Component, OnInit } from '@angular/core';
import { VERSION } from '../../environments/version';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit
{
  private github_link = "https://github.com/nichelia/todo"
  public version = "v"+VERSION.version;

  constructor() { }

  ngOnInit(): void { }

  goToSourceCode()
  {
    window.open(this.github_link);
  }

}
