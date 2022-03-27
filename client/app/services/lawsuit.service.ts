import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Lawsuit , LawsuitTable , RequestTable } from '../shared/models/lawsuit.model';

@Injectable()
export class LawsuitService {

  constructor(private http: HttpClient) { }

  getLawsuitInfo(limit: Number, page: Number): Observable<Lawsuit[]> {
    return this.http.get<Lawsuit[]>(`/lawsuitinfo/${limit}/${page}`);
  }

  setLawsuitInfo(data: Lawsuit ): Observable<Lawsuit>{
    return this.http.post('./lawsuitinfo', data);
  }

  countLawsuitInfo():Observable<Number>{
    return this.http.get<Number>('/lawsuitinfo/count');
  }

  getLawsuitInfoId(id:String):Observable<Lawsuit>{
    return this.http.get('/lawsuitinfo/'+id);
  }

  updateLawsuitInfo(id: String, data: Lawsuit):Observable<Lawsuit>{
    return this.http.put('/lawsuitinfo/'+id, data);
  }

  deleteLawsuitInfo(id:String):Observable<any>{
    return this.http.get('/lawsuitinfo/'+id);
  }

}

@Injectable()
export class LawsuitTableService {

  constructor(private http: HttpClient) { }

  getLawsuitTable(data: Object): Observable<LawsuitTable[]> {
    return this.http.post<LawsuitTable[]>('/lawsuittable/where',data);
  }

  setLawsuitTable(data: LawsuitTable ): Observable<LawsuitTable>{
    return this.http.post('./lawsuittable', data);
  }

  countLawsuitTable():Observable<Number>{
    return this.http.get<Number>('/lawsuittable/count');
  }

  getLawsuitTableId(id:String):Observable<LawsuitTable>{
    return this.http.get('/lawsuittable/'+id);
  }

  updateLawsuitTable(id: String, data: Lawsuit):Observable<LawsuitTable>{
    return this.http.put('/lawsuittable/'+id, data);
  }

  deleteLawsuitTable(id:String):Observable<any>{
    return this.http.get('/lawsuittable/'+id);
  }

}

@Injectable()
export class RequestTableService {

  constructor(private http: HttpClient) { }

  getRequestTable(data: Object): Observable<RequestTable[]> {
    return this.http.post<RequestTable[]>('/requesttable/where',data);
  }

  setRequestTable(data: RequestTable ): Observable<RequestTable>{
    return this.http.post('./requesttable', data);
  }

  countRequestTable():Observable<Number>{
    return this.http.get<Number>('/requesttable/count');
  }

  getRequestTableId(id:String):Observable<RequestTable>{
    return this.http.get('/requesttable/'+id);
  }

  updateRequestTable(id: String, data: Lawsuit):Observable<RequestTable>{
    return this.http.put('/requesttable/'+id, data);
  }

  deleteRequestTable(id:String):Observable<any>{
    return this.http.get('/requesttable/'+id);
  }

}

