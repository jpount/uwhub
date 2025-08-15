import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task.interface';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, RouterLink],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss'
})
export class Tasks implements OnInit {
  allTasks = signal<Task[]>([]);
  openTasks = signal<Task[]>([]);
  completedTasks = signal<Task[]>([]);
  isLoading = signal(true);
  activeTab = signal<'open' | 'completed' | 'all'>('open');

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  private loadTasks() {
    this.isLoading.set(true);
    
    this.taskService.getAllTasks().subscribe(tasks => {
      this.allTasks.set(tasks);
      this.openTasks.set(tasks.filter(t => t.status === 'Pending'));
      this.completedTasks.set(tasks.filter(t => t.status === 'Quoted' || t.status === 'Referred'));
      this.isLoading.set(false);
    });
  }

  setActiveTab(tab: 'open' | 'completed' | 'all') {
    this.activeTab.set(tab);
  }

  getCurrentTasks(): Task[] {
    switch (this.activeTab()) {
      case 'open':
        return this.openTasks();
      case 'completed':
        return this.completedTasks();
      case 'all':
        return this.allTasks();
      default:
        return this.allTasks();
    }
  }

  getPropensityClass(propensity: string): string {
    const classes = {
      'Almost certain': 'propensity-certain',
      'Likely': 'propensity-likely',
      'Even chance': 'propensity-even',
      'Unlikely': 'propensity-unlikely',
      'Remote': 'propensity-remote'
    };
    return classes[propensity as keyof typeof classes] || 'propensity-even';
  }

  getStatusClass(status: string): string {
    const classes = {
      'Pending': 'status-pending',
      'Quoted': 'status-quoted',
      'Referred': 'status-referred'
    };
    return classes[status as keyof typeof classes] || 'status-pending';
  }

  formatPremium(amount: number): string {
    if (amount === 0) return '-';
    return `$${amount.toLocaleString()}`;
  }
}
