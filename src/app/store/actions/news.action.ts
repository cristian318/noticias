import { createAction, props } from '@ngrx/store';
import { News } from 'src/app/models/news.model';

export const getNews = createAction('[Counter Component] GetNews');
export const setNews = createAction(
  '[Counter Component] SetNews',
  props<{ news: News[] }>()
);
