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
  isMobileMenuOpen = signal(false);
  activeSection = signal('main-info');
  isEditMode = signal(false);
  hasUnsavedChanges = signal(false);

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

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(value => !value);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  navigateToSection(section: string) {
    this.activeSection.set(section);
    // Close mobile menu after navigation
    this.closeMobileMenu();
  }

  toggleEditMode() {
    if (this.isEditMode()) {
      // If currently in edit mode, save changes
      this.saveChanges();
    } else {
      // Enter edit mode
      this.isEditMode.set(true);
    }
  }

  saveChanges() {
    // Simulate saving changes
    console.log('Saving changes...');
    
    // In a real app, you would save to backend here
    // For now, we'll just show a success message
    this.isEditMode.set(false);
    this.hasUnsavedChanges.set(false);
    
    // Show success notification (you can enhance this)
    alert('Changes saved successfully!');
  }

  cancelEdit() {
    if (this.hasUnsavedChanges()) {
      const confirmCancel = confirm('You have unsaved changes. Are you sure you want to cancel?');
      if (!confirmCancel) {
        return;
      }
    }
    
    this.isEditMode.set(false);
    this.hasUnsavedChanges.set(false);
    // Reload original data
    this.loadTaskDetail(this.route.snapshot.params['id']);
  }

  onFieldChange() {
    this.hasUnsavedChanges.set(true);
  }
}
