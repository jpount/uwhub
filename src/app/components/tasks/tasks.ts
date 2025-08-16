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
  teamTasks = signal<Task[]>([]);
  teamOpenTasks = signal<Task[]>([]);
  teamCompletedTasks = signal<Task[]>([]);
  isLoading = signal(true);
  activeTab = signal<'open' | 'completed' | 'all'>('open');
  viewMode = signal<'personal' | 'team'>('personal');

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  private loadTasks() {
    this.isLoading.set(true);
    
    this.taskService.getAllTasks().subscribe(tasks => {
      // Personal tasks (existing logic)
      this.allTasks.set(tasks);
      this.openTasks.set(tasks.filter(t => t.status === 'Pending'));
      this.completedTasks.set(tasks.filter(t => t.status === 'Quoted' || t.status === 'Referred'));
      
      // Team tasks (simulate team data by duplicating some tasks with different assignees)
      const teamTasksData = this.generateTeamTasks(tasks);
      this.teamTasks.set(teamTasksData);
      this.teamOpenTasks.set(teamTasksData.filter(t => t.status === 'Pending'));
      this.teamCompletedTasks.set(teamTasksData.filter(t => t.status === 'Quoted' || t.status === 'Referred'));
      
      this.isLoading.set(false);
    });
  }

  private generateTeamTasks(personalTasks: Task[]): Task[] {
    // Create team tasks by modifying some personal tasks to show different team members
    const teamMembers = ['John Wilson', 'Sarah Chen', 'Mike Johnson', 'Lisa Wang', 'David Brown'];
    const teamTasks: Task[] = [];
    
    personalTasks.forEach((task, index) => {
      // Add the user's own tasks
      teamTasks.push({
        ...task,
        assignedTo: 'Jane Smith' // Current user
      });
      
      // Add some additional team tasks
      if (index < 8) { // Limit to avoid too many tasks
        const teamMember = teamMembers[index % teamMembers.length];
        teamTasks.push({
          ...task,
          id: `TEAM-${task.id}`,
          accountName: `${task.accountName} (Team)`,
          assignedTo: teamMember,
          targetActionDate: this.getRandomFutureDate(),
          premium: Math.floor(Math.random() * 50000) + 10000
        });
      }
    });
    
    return teamTasks;
  }

  private getRandomFutureDate(): string {
    const dates = ['Aug 15, 2024', 'Aug 20, 2024', 'Aug 25, 2024', 'Sep 01, 2024', 'Sep 05, 2024'];
    return dates[Math.floor(Math.random() * dates.length)];
  }

  setActiveTab(tab: 'open' | 'completed' | 'all') {
    this.activeTab.set(tab);
  }

  setViewMode(mode: 'personal' | 'team') {
    this.viewMode.set(mode);
  }

  getCurrentTasks(): Task[] {
    const isTeamView = this.viewMode() === 'team';
    
    switch (this.activeTab()) {
      case 'open':
        return isTeamView ? this.teamOpenTasks() : this.openTasks();
      case 'completed':
        return isTeamView ? this.teamCompletedTasks() : this.completedTasks();
      case 'all':
        return isTeamView ? this.teamTasks() : this.allTasks();
      default:
        return isTeamView ? this.teamTasks() : this.allTasks();
    }
  }

  getTaskCounts() {
    const isTeamView = this.viewMode() === 'team';
    return {
      open: isTeamView ? this.teamOpenTasks().length : this.openTasks().length,
      completed: isTeamView ? this.teamCompletedTasks().length : this.completedTasks().length,
      all: isTeamView ? this.teamTasks().length : this.allTasks().length
    };
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
