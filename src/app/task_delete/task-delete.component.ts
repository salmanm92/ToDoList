import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";

import { Task, TaskService } from "../shared/index";

@Component({
  selector: "app-task-delete",
  templateUrl: "task-delete.component.html"
})
export class TaskDeleteComponent implements OnInit {
  task: Task = new Task("", "", false);
  errorMessage: string = "";

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: TaskService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params["id"];
    if (id) { 
      this.service.getTask(id)
        .subscribe(
          task => this.task = task,
          error => this.errorMessage = error
        );
    }
  }

  deleteTask() {
    this.service.deleteTask(this.task.id)
      .subscribe(
        () => this.goBack(),
        error => this.errorMessage = error
      );
  }

  goBack() {
    this.router.navigate(["taskList"]);
  }

}
