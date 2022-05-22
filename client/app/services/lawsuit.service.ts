import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Lawsuit , LawsuitTable , RequestTable } from './../shared/models/lawsuit.model';

@Injectable()
export class LawsuitService {

  constructor(private http: HttpClient) { }

  getLawsuitInfo(limit: Number, page: Number): Observable<Lawsuit[]> {
    return this.http.get<Lawsuit[]>(`/api/lawsuitinfo/${limit}/${page}`);
  }

  setLawsuitInfo(data: Lawsuit ): Observable<Lawsuit>{
    return this.http.post('/api/lawsuitinfo2', data);
  }

  countLawsuitInfo():Observable<Number>{
    return this.http.get<Number>('/api/lawsuitinfo/count');
  }

  getLawsuitInfoId(id:String):Observable<Lawsuit>{
    return this.http.get('/api/lawsuitinfo/'+id);
  }

  updateLawsuitInfo(id: String, data: Lawsuit):Observable<Lawsuit>{
    return this.http.put('/api/lawsuitinfo/'+id, data);
  }

  deleteLawsuitInfo(id:String):Observable<any>{
    return this.http.get('/api/lawsuitinfo/'+id);
  }

}

@Injectable()
export class LawsuitTableService {

  constructor(private http: HttpClient) { }

  getLawsuitTable(data: Object): Observable<LawsuitTable[]> {
    return this.http.post<LawsuitTable[]>('/api/lawsuittable/where',data);
  }

  setLawsuitTable(data: LawsuitTable ): Observable<LawsuitTable>{
    return this.http.post<LawsuitTable>('/api/lawsuittable', data);
  }

  countLawsuitTable():Observable<Number>{
    return this.http.get<Number>('/api/lawsuittable/count');
  }

  getLawsuitTableId(id:String):Observable<LawsuitTable>{
    return this.http.get('/api/lawsuittable/'+id);
  }

  updateLawsuitTable(id: String, data: Lawsuit):Observable<LawsuitTable>{
    return this.http.put('/api/lawsuittable/'+id, data);
  }

  deleteLawsuitTable(id:String):Observable<any>{
    return this.http.delete('/api/lawsuittable/'+id);
  }

}

@Injectable()
export class RequestTableService {

  constructor(private http: HttpClient) { }

  getRequestTable(data: Object): Observable<RequestTable[]> {
    return this.http.post<RequestTable[]>('/api/requesttable/where',data);
  }

  setRequestTable(data: RequestTable ): Observable<RequestTable>{
    return this.http.post<RequestTable>('/api/requesttable', data);
  }

  countRequestTable():Observable<Number>{
    return this.http.get<Number>('/api/requesttable/count');
  }

  getRequestTableId(id:String):Observable<RequestTable>{
    return this.http.get('/api/requesttable/'+id);
  }

  updateRequestTable(id: String, data: Lawsuit):Observable<RequestTable>{
    return this.http.put('/api/requesttable/'+id, data);
  }

  deleteRequestTable(id:String):Observable<any>{
    return this.http.delete('/api/requesttable/'+id);
  }

}

