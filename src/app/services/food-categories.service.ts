import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class FoodCategoriesService {
  apiBase = `${environment.apiBase}/categories`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiBase);
  }
}
