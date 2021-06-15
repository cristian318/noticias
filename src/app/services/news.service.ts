import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private httpService: HttpService) {}

  getNews() {
    return this.httpService.makeGet('servicios/noticias');
  }

  getPrograms() {
    return this.httpService.makeGet('servicios/programas');
  }
}
