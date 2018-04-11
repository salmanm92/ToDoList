import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskListComponent } from './task_list/task-list.component';
import { TaskAddEditComponent } from './task_add_edit/task-add-edit.component';
import { TaskDeleteComponent } from './task_delete/task-delete.component';

const routes: Routes = [
  { path: 'taskList', component: TaskListComponent },
  { path: 'task/new', component: TaskAddEditComponent },
  { path: 'task/edit/:id', component: TaskAddEditComponent },
  { path: 'task/delete/:id', component: TaskDeleteComponent },
  { path: '**', redirectTo: '/taskList', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule  { }
