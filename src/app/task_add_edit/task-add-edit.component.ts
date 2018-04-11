import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TaskService, Task } from '../shared/index';

@Component({
  selector: 'app-task-add-edit',
  templateUrl: './task-add-edit.component.html'
})
export class TaskAddEditComponent implements OnInit {
  task: Task = new Task("", "", false);
  title: string = "";
  errorMessage: string = "";
  taskForm: FormGroup;

  constructor(private service: TaskService,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router) { }

  ngOnInit() {
    this.buildForm();
    this.getData();
  }

  public checkError(element: string, errorType: string) {
    return this.taskForm.get(element).hasError(errorType) &&
      this.taskForm.get(element).touched
  }

  public onSubmit() {
    this.task.text = this.taskForm.value.text;

    if (this.task.id) {
      this.service.updateTask(this.task)
        .subscribe(
          () => this.goBack(),
          error => this.errorMessage = error
        );
    } else {
      this.task.id = Date.now().toString();
      this.service.addTask(this.task)
        .subscribe(
          () => this.goBack(),
          error => this.errorMessage += error
        );
    }
  }

  public goBack() {
    this.router.navigate(["taskList"]);
  }

  private getData() {
    let id = this.activatedRoute.snapshot.params["id"];
    if (id) {
      this.title = "Edit Task";
      this.service.getTask(id)
        .subscribe(
          task => {
            this.task = task;
            this.taskForm.patchValue(this.task);
          },
          error => this.errorMessage = error
        );
    } else {
      this.title = "Add New Task";
      this.taskForm.patchValue(this.task);
    }
  }

  private buildForm() {
    this.taskForm = this.fb.group({
      text: ["", Validators.required],
    });  
  }

}
