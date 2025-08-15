import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: 'tasks',
    loadComponent: () => import('./components/tasks/tasks').then(m => m.Tasks)
  },
  {
    path: 'task-detail/:id',
    loadComponent: () => import('./components/task-detail/task-detail').then(m => m.TaskDetail)
  },
  {
    path: 'completed-tasks',
    loadComponent: () => import('./components/completed-tasks/completed-tasks').then(m => m.CompletedTasksComponent)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];