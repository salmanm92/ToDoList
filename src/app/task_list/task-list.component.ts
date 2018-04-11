import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService, Task } from '../shared/index';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  errorMessage: string = "";

  constructor(private service: TaskService,
    private router: Router) { }

  ngOnInit() {
    this.service.getTasks()
      .subscribe(
        tasks => this.tasks = tasks,
        error => this.errorMessage = error
      );
  }

  public markTask(task) {
    task.completed = !task.completed;
    this.service.updateTask(task)
      .subscribe(
        () => this.errorMessage = "",
        error => this.errorMessage = error
      );
  }

  public editTask(id: string) {
    this.router.navigate(["task", "edit", id]);
  }

  public deleteTask(id: string) {
    this.router.navigate(["task", "delete", id]);
  }

}
