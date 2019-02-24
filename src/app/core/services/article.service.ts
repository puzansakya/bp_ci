import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Article } from '../models/article.model';
import { Articles } from '../models/articles.model';


@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) { }

  getArticles(page: number): Observable<Articles> {
    return this.http
      .get<Articles>(`https://medium-puzan.herokuapp.com/api/v1/articles?page=${page}&limit=12&sort=id&order=desc`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  getArticle(slug: string): Observable<Article> {
    return this.http
      .get<Article>(`https://medium-puzan.herokuapp.com/api/v1/articles/${slug}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  createArticle(payload: { article: Article, buffer: File }): Observable<Article> {    
    let formdata: FormData = new FormData();

    if (payload.buffer != null) {
      formdata.append('backdrop', payload.buffer);
    }

    formdata.append('heading', payload.article.heading);
    formdata.append('slug', payload.article.slug);
    formdata.append('description', payload.article.description);
    formdata.append('status', payload.article.status);
    formdata.append('content', payload.article.content);

    return this.http
      .post<Article>(`https://medium-puzan.herokuapp.com/api/v1/articles`, formdata)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}