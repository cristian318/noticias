import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NewsState } from 'src/app/models/newState.model';

export const getNewsState = createFeatureSelector<NewsState>('news');

export const getNews = createSelector(
  getNewsState,
  (state: NewsState) => state.data
);
