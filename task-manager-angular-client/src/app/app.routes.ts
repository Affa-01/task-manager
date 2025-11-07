import { Routes } from '@angular/router';
import { TasksViewer } from './tasks-viewer/tasks-viewer';
import { LoginComponent } from './login/login';
import { mustBeLoggedInGuard } from './must-be-logged-in-guard/must-be-logged-in-guard';

export const routes: Routes = [
    {
        path: '',
        component: TasksViewer,
        pathMatch: 'full',
        canActivate: [mustBeLoggedInGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        
    },
    { path: '**', redirectTo: '' },
];
