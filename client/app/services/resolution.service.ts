import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ResolutionService {

  constructor(private http: HttpClient) { }

  getResolution(limit: Number, page: Number): Observable<any> {
    return this.http.get(`/api/resolution/${limit}/${page}`);
  }

  setResolution(data ): Observable<any>{
    return this.http.post('/api/resolution', data);
  }

  countResolution():Observable<Number>{
    return this.http.get<Number>('/api/resolutions/count');
  }

  getResolutionId(id:String):Observable<any>{
    return this.http.get('/api/resolution/'+id);
  }

  updateResolution(id: String, data: any):Observable<any>{
    return this.http.put('/api/resolution/'+id, data);
  }

  deleteResolution(id:String):Observable<any>{
    return this.http.get('/api/resolution/'+id);
  }

}
