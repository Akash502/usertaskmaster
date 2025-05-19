import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { AddTaskDialogComponent } from './task/add-task-dialog/add-task-dialog.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path:'',component:LoginComponent},
    { path:'Registration',component:RegistrationComponent},
    { path:'Task',component:TaskListComponent },
    { path:'Add-Task',component:AddTaskDialogComponent}
];
