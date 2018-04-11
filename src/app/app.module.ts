import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TaskListComponent } from './task_list/task-list.component';
import { TaskAddEditComponent } from './task_add_edit/task-add-edit.component';
import { TaskDeleteComponent } from './task_delete/task-delete.component';

import { TaskService } from './shared/index';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    NavigationComponent,
    TaskListComponent,
    TaskAddEditComponent,
    TaskDeleteComponent
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
