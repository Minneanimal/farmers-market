import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdsService {
  apiBase = `${environment.apiBase}/categories`;

  constructor(private http: HttpClient) {}

  getAds(): Observable<{ id: string; img: string }[]> {
    return this.http.get<{ id: string; img: string }[]>(this.apiBase);
  }
}
