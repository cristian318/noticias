import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { News } from 'src/app/models/news.model';
import { NewsState } from 'src/app/models/newState.model';
import { getNews } from '../../store';
import * as newsSelector from '../../store/selectors/news.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  news$!: Observable<NewsState>;
  data$!: Observable<any>;

  observables: any[];
  news: News[];

  constructor(private store: Store<{ news: NewsState }>) {
    this.observables = [];
    this.news = [];
  }

  ngOnInit(): void {
    this.news$ = this.store.pipe(select('news'));
    this.data$ = this.store.pipe(select(newsSelector.getNews));
    this.initObservables();
    this.getNews();
  }

  ngOnDestroy() {
    this.destroyObservables();
  }

  initObservables() {
    this.observables.push(
      this.data$.subscribe((res) => {
        this.news = res;
        console.log(res);
      })
    );
  }

  destroyObservables() {
    this.observables.forEach((observable) => {
      observable.unsubscribe();
    });
  }

  getNews() {
    this.store.dispatch(getNews());
  }
}
