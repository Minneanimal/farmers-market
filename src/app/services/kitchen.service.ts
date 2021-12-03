import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateKitchenDto } from '../shared/dtos/create-kitchen.dto';
import { KitchenDto } from '../shared/dtos/kitchen.dto';

@Injectable({
  providedIn: 'root',
})
export class KitchenService {
  apiBase = `${environment.apiBase}/kitchens`;

  constructor(private http: HttpClient) {}

  createKitchen(createKitchenDto: CreateKitchenDto): Observable<KitchenDto> {
    const url = `${this.apiBase}`;
    return this.http.post<KitchenDto>(url, createKitchenDto);
  }
}
