import { News } from './news.model';

export interface NewsState {
  data: News[];
  loaded: boolean;
  loading: boolean;
  error: string;
}
