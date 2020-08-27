import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { VERSION } from '../environments/version';
import { ColourSchemeService } from "./dark-mode/colour-scheme.service";
import { unauthorisedRoute, authorisedRoute } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  title = 'todo';
  version = "v"+VERSION.version;

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private colorSchemeService: ColourSchemeService)
  {
    this.colorSchemeService.load();
  }

  ngOnInit(): void
  {
    this.auth.authState.subscribe(user => {
      if (user)
      {
        this.router.navigate([authorisedRoute]);
      }
      else
      {
        this.router.navigate([unauthorisedRoute]);
      }
    });
  }

}

