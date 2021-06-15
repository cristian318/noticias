import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { NewsService } from '../../services/news.service';
import { getNews, setNews } from '../actions/news.action';

@Injectable({
  providedIn: 'root',
})
export class NewsEffects {
  constructor(private newsService: NewsService, private actions$: Actions) {}

  getNewsDataEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getNews),
      tap(() => {}),
      mergeMap(() => {
        return this.newsService.getNews().pipe(
          map((res) => setNews({ news: res })),
          catchError(() => of(setNews({ news: [] })))
        );
      })
    );
  });
}
