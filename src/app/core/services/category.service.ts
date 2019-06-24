import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { ResponseWrapper } from '../models/response.model';

@Injectable()
export class CategoryService {
    constructor(private http: HttpClient) { }

    getCategory(): Observable<ResponseWrapper<Category>> {
        return this.http
            .get<ResponseWrapper<Category>>(`https://medium-puzan.herokuapp.com//api/v1/categories?limit=30`)
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    createCategory(payload: Category): Observable<Category> {
        return this.http
            .post<Category>(`https://medium-puzan.herokuapp.com//api/v1/categories`, payload)
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    updateCategory(payload: Category): Observable<Category> {
        return this.http
            .put<Category>(`https://medium-puzan.herokuapp.com//api/v1/categories/${payload.id}`, payload)
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }    
}
