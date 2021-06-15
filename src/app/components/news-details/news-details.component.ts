import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { News } from 'src/app/models/news.model';
import { NewsState } from 'src/app/models/newState.model';
import { RouterService } from 'src/app/services/router.service';
import { getNews } from '../../store';
import * as newsSelector from '../../store/selectors/news.selector';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss'],
})
export class NewsDetailsComponent implements OnInit {
  observables: any[];
  data$!: Observable<any>;
  news: News;
  newsId = '';

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ news: NewsState }>,
    private routerService: RouterService
  ) {
    this.observables = [];
    this.news = {
      id: '',
      title: '',
      body: '',
    };
    this.data$ = this.store.pipe(select(newsSelector.getNews));
  }

  ngOnInit(): void {
    this.getNews();
    this.getId();
    this.getData();
  }

  getData() {
    this.observables.push(
      this.data$.subscribe((data: News[]) => {
        [this.news] = data.filter((x) => x.id === this.newsId);
      })
    );
  }

  getId() {
    this.observables.push(
      this.route.params
        .pipe(
          map((params: any) => {
            return params['id'];
          }),
          mergeMap((id) => {
            this.newsId = id;
            return this.data$;
          })
        )
        .subscribe((data: News[]) => {
          [this.news] = data.filter((x) => x.id === this.newsId);
        })
    );
  }

  goBack() {
    this.routerService.goto('/home');
  }

  getNews() {
    this.store.dispatch(getNews());
  }

  destroyObservables() {
    this.observables.forEach((observable) => {
      observable.unsubscribe();
    });
  }
}
