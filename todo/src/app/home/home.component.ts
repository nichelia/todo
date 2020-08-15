import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
{
  private github_link = "https://github.com/nichelia/todo"

  constructor() { }

  ngOnInit(): void { }

  goToSourceCode()
  {
    window.open(this.github_link);
  }

}
