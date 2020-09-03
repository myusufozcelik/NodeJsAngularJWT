import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Author} from '../author/author';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  path = environment.path
  constructor(private http:HttpClient) { }


  getAuthors():Observable<Author[]> {
   return this.http.get<Author[]>(`${this.path}/author`)
  }

}
