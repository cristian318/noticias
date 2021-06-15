import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  links = [
    {
      text: 'Home',
      url: '/home',
    },
    {
      text: 'Registro',
      url: '/registro',
    },
    {
      text: 'Noticias',
      url: '/noticias',
    },
  ];

  constructor(private routerService: RouterService) {}

  ngOnInit(): void {}

  goto(url: string) {
    this.routerService.goto(url);
  }
}
