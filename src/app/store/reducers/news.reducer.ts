import { createReducer, on } from '@ngrx/store';
import { NewsState } from 'src/app/models/newState.model';
import * as states from '../actions/news.action';

export const initialState: NewsState = {
  data: [],
  loaded: false,
  loading: false,
  error: '',
};

const _newsReducer = createReducer(
  initialState,
  on(states.setNews, (state, { news }) => ({
    ...state,
    data: news,
  }))
);

export function newsReducer(state: any, action: any) {
  return _newsReducer(state, action);
}
