import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Breed } from '../models/breed.model';
import { CatImage } from '../models/cat.image.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  constructor(private httpClient: HttpClient) { }

  getBreeds(): Observable<Breed[]> {
    return this.httpClient.get<Breed[]>(`${environment.apiUrl}/breeds`);
  }

  getCatsByBreed(breedId: string, limit: number): Observable<CatImage[]> {
    return this.httpClient.get<CatImage[]>(`${environment.apiUrl}/images/search?breed_id=${breedId}&limit=${limit}`);
  }

}
