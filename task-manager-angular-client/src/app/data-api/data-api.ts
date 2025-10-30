import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';


class List {
  id: string;
  name: string;
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

class Task {
  id : string;
  entryString : string;
  listId : string;
  pos : number;

  constructor(id: string, entryString: string, listId: string, pos: number) {
    this.id = id;
    this.entryString = entryString;
    this.listId = listId;
    this.pos = pos;
  }
}

@Injectable({
  providedIn: 'root'
})
class DataApi {
  baseUrl = environment.apiBaseUrl;
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getLists() : Observable<List[]>{
    return this.http.get<List[]>(`${this.baseUrl}/lists`);
  }

  createList(name: string){
    return this.http.post(`${this.baseUrl}/lists`, {listName: name});
  }

  deleteList(listId: string){
    return this.http.delete(`${this.baseUrl}/lists/${listId}`);
  }

  getTasksFromList(listId: string) : Observable<Task[]>{
    return this.http.get<Task[]>(`${this.baseUrl}/tasks/list/${listId}`);
  }

  createTask(entryString: string, listId: string){
    return this.http.post(`${this.baseUrl}/tasks`, {entryString, listId});
  }

  deleteTask(taskId: string){
    return this.http.delete(`${this.baseUrl}/tasks/${taskId}`);
  }
}


export { DataApi, List, Task };