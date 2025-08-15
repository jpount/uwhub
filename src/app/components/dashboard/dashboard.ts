import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task';
import { Task, DashboardCard, PortfolioCard, ProductCategory } from '../../models/task.interface';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  dashboardCards = signal<DashboardCard[]>([]);
  portfolioCards = signal<PortfolioCard[]>([]);
  productCategories = signal<ProductCategory[]>([]);
  tasksThisWeek = signal<Task[]>([]);
  isLoading = signal(true);
  selectedCategory = signal<string>("Today's tasks");

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.isLoading.set(true);
    
    // Load dashboard cards
    this.taskService.getDashboardCards().subscribe(cards => {
      this.dashboardCards.set(cards);
    });

    // Load portfolio cards
    this.taskService.getPortfolioCards().subscribe(cards => {
      this.portfolioCards.set(cards);
    });

    // Load product categories
    this.taskService.getProductCategories().subscribe(categories => {
      this.productCategories.set(categories);
    });

    // Load tasks due this week
    this.taskService.getTasksDueThisWeek().subscribe(tasks => {
      this.tasksThisWeek.set(tasks);
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

  onCategoryClick(category: ProductCategory): void {
    // Update selected category
    this.selectedCategory.set(category.name);
    
    // Update active state
    const categories = this.productCategories();
    const updatedCategories = categories.map(cat => ({
      ...cat,
      isActive: cat.id === category.id
    }));
    this.productCategories.set(updatedCategories);
  }
}