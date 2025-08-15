import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task';
import { Task, TaskDetail as TaskDetailInterface } from '../../models/task.interface';

@Component({
  selector: 'app-task-detail',
  imports: [CommonModule],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss'
})
export class TaskDetail implements OnInit {
  task = signal<Task | null>(null);
  taskDetail = signal<TaskDetailInterface | null>(null);
  isLoading = signal(true);

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const taskId = params['id'];
      if (taskId) {
        this.loadTaskDetail(taskId);
      }
    });
  }

  private loadTaskDetail(taskId: string) {
    this.isLoading.set(true);
    
    // Load basic task info
    this.taskService.getTaskById(taskId).subscribe(task => {
      if (task) {
        this.task.set(task);
      } else {
        // Task not found, redirect to tasks page
        this.router.navigate(['/tasks']);
        return;
      }
    });

    // Load detailed task information
    this.taskService.getTaskDetail(taskId).subscribe(detail => {
      this.taskDetail.set(detail || null);
      this.isLoading.set(false);
    });
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }

  navigateToTasks() {
    this.router.navigate(['/tasks']);
  }
}
