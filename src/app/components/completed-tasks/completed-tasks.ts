import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task.interface';

@Component({
  selector: 'app-completed-tasks',
  imports: [CommonModule, RouterLink],
  templateUrl: './completed-tasks.html',
  styleUrl: './completed-tasks.scss'
})
export class CompletedTasksComponent implements OnInit {
  completedTasks = signal<Task[]>([]);
  isLoading = signal(true);

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadCompletedTasks();
  }

  private loadCompletedTasks() {
    this.isLoading.set(true);
    
    // Load completed tasks
    this.taskService.getCompletedTasks().subscribe(tasks => {
      this.completedTasks.set(tasks);
      this.isLoading.set(false);
    });
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

  formatPremium(amount: number): string {
    if (amount === 0) return '-';
    return `$${amount.toLocaleString()}`;
  }

  getTotalPremium(): string {
    const total = this.completedTasks().reduce((sum, task) => sum + task.premium, 0);
    return `$${total.toLocaleString()}`;
  }

  getSuccessRate(): string {
    const tasks = this.completedTasks();
    if (tasks.length === 0) return '0%';
    const successful = tasks.filter(t => 
      t.propensityToBind === 'Almost certain' || 
      t.propensityToBind === 'Likely'
    ).length;
    return `${Math.round((successful / tasks.length) * 100)}%`;
  }
}