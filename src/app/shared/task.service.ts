import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Task } from './index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class TaskService {
  private url = 'http://localhost:3004/tasks';
  
  constructor(private http: Http) { }

  public getTasks(): Observable<Task[]> {
    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getTask(id: string): Observable<Task> {
    return this.http.get(this.url + "/" + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public updateTask(task: Task) {
    return this.http.put(this.url + "/" + task.id, task)
      .catch(this.handleError);
  }

  public addTask(task: Task) {
    return this.http.post(this.url, task)
      .catch(this.handleError);
  }

  public deleteTask(id: string) {
    return this.http.delete(this.url + "/" + id)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res.json();
  }

  private handleError(error: any, cought: Observable<any>): any {
    let message = "";

    if (error instanceof Response) {
      let errorData = error.json().error || JSON.stringify(error.json());
      message = `${error.status} - ${error.statusText || ''} ${errorData}`
    } else {
      message = error.message ? error.message : error.toString();
    }

    console.error(message);
    return Observable.throw(message);
  }
}

