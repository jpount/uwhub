# UW Hub - Underwriting Task Management Application

A modern Angular 20 application for insurance underwriting task management, built with standalone components, zoneless change detection, and comprehensive responsive design.

## 📋 Table of Contents

- [Features](#features)
- [Technical Architecture](#technical-architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Responsive Design](#responsive-design)
- [Development](#development)
- [Components Overview](#components-overview)
- [Data Models](#data-models)
- [Mock Data](#mock-data)
- [Deployment](#deployment)

## ✨ Features

### Core Functionality
- **Dashboard Overview**: Real-time task management with priority indicators
- **Task Management**: Complete CRUD operations for underwriting tasks
- **Portfolio Tracking**: Team and individual portfolio management
- **Progress Monitoring**: Weekly completion tracking and analytics
- **Quote Management**: Integrated quote summary and editing capabilities
- **Mobile Responsive**: Full mobile optimization with landscape/portrait support

### Business Features
- **Insurance Underwriting**: NAIC code integration and LOB product tracking
- **Risk Assessment**: Propensity to bind calculations and premium tracking
- **Team Collaboration**: Servicing and collaboration workflows
- **Task Prioritization**: Priority flagging and target action date management
- **Status Tracking**: Real-time status updates and pending action monitoring

## 🏗 Technical Architecture

### Modern Angular Features
- **Angular 20**: Latest framework with cutting-edge features
- **Zoneless Change Detection**: Uses `provideZonelessChangeDetection()` for optimal performance
- **Standalone Components**: All components use standalone API with `imports: []`
- **Lazy Loading**: Routes use `loadComponent()` for efficient code splitting
- **Signals**: Angular signals for reactive state management
- **TypeScript Strict Mode**: Full type safety with strict compiler settings

### Development Stack
- **Framework**: Angular 20.1.6
- **Language**: TypeScript 5.7
- **Styling**: SCSS with CSS Variables and Grid/Flexbox
- **Build Tool**: Angular CLI with Webpack
- **Testing**: Jasmine & Karma (configured)
- **Linting**: ESLint with Angular rules

## 🚀 Getting Started

### Prerequisites
- Node.js (18.x or higher)
- npm (9.x or higher)
- Angular CLI (20.x)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd UWHubAppWithFigma

# Install dependencies
npm install

# Start development server
ng serve
# or
npm start

# Open browser to http://localhost:4200
```

### Build for Production

```bash
# Build for production
ng build

# Build with watch mode for development
ng build --watch --configuration development
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/           # Main dashboard with task overview
│   │   ├── tasks/              # Task list and management
│   │   ├── task-detail/        # Individual task details
│   │   ├── completed-tasks/    # Completed tasks view
│   │   ├── servicing/          # Insurance servicing workflows
│   │   └── collaboration/      # Team collaboration tools
│   ├── models/
│   │   └── task.interface.ts   # TypeScript interfaces
│   ├── services/
│   │   └── task.ts            # Mock data service
│   ├── app.routes.ts          # Application routing
│   ├── app.html              # Root template
│   └── app.ts                # Root component
├── styles.scss               # Global styles and responsive design
└── index.html               # Application entry point
```

## 📱 Responsive Design

### Breakpoint Strategy
- **Desktop**: 1200px+ (Full layout with sidebar)
- **Tablet Landscape**: 992px - 1199px (Adapted layout)
- **Tablet Portrait**: 768px - 991px (Stacked layout)
- **Mobile Landscape**: 481px - 767px (Horizontal optimization)
- **Mobile Portrait**: 320px - 480px (Mobile-first design)

### Mobile Optimizations
- **Navigation**: Icon-only navigation on small screens
- **Tables**: Horizontal scroll with minimum width constraints
- **Cards**: Flexible grid system adapting to screen size
- **Sidebar**: Collapsible navigation with mobile-friendly touch targets
- **Quote Summary**: Adaptive positioning for different screen sizes

### Responsive Features
```scss
/* Example mobile-first approach */
.dashboard-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## 🛠 Development

### Key Commands
```bash
# Development server
ng serve

# Generate new component
ng generate component component-name

# Run tests
ng test

# Build for production
ng build

# Lint code
ng lint
```

### Code Style Guidelines
- Use standalone components exclusively
- Implement TypeScript interfaces for all data structures
- Follow Angular naming conventions (kebab-case for files)
- Use SCSS with BEM methodology for styling
- Implement responsive design mobile-first

## 🧩 Components Overview

### Dashboard Component (`dashboard.ts`)
- **Purpose**: Main landing page with task overview
- **Features**: Category filtering, portfolio cards, task summary
- **State Management**: Angular signals for reactive updates
- **Key Methods**: `onCategoryClick()`, category filtering

### Tasks Component (`tasks.ts`)
- **Purpose**: Task list management and navigation
- **Features**: Priority sorting, status filtering, task details navigation
- **Data Binding**: Observable-based data loading
- **Responsive**: Horizontal scroll table for mobile

### Task Detail Component (`task-detail.ts`)
- **Purpose**: Individual task management and editing
- **Features**: Quote summary sidebar, navigation breadcrumb
- **Layout**: Split layout with sidebar navigation
- **Mobile**: Collapsible sidebar, stacked layout

### Completed Tasks Component (`completed-tasks.ts`)
- **Purpose**: Historical task tracking and analytics
- **Features**: Premium calculations, success rate metrics
- **Navigation**: Clickable task IDs for detail view
- **Analytics**: `getTotalPremium()`, `getSuccessRate()` methods

## 📊 Data Models

### Core Interfaces

```typescript
interface Task {
  id: string;
  accountName: string;
  naicDescription: string;
  lobProducts: string;
  transactionType: string;
  propensityToBind: string;
  status: string;
  targetActionDate: string;
  pendingAction: string;
  premium: number;
  priority?: boolean;
}

interface DashboardCard {
  id: string;
  title: string;
  count: number;
  icon: string;
  color: string;
  trend?: string;
}
```

### Task Service Methods
- `getTasks()`: Returns Observable<Task[]> for active tasks
- `getCompletedTasks()`: Returns Observable<Task[]> for completed tasks
- `getTaskDetail(id: string)`: Returns detailed task information
- `getDashboardCards()`: Returns dashboard summary cards

## 🎭 Mock Data

The application uses comprehensive mock data representing realistic insurance underwriting scenarios:

- **8 Active Tasks**: Various insurance accounts with different statuses
- **7 Completed Tasks**: Historical tasks with premium calculations
- **Dashboard Cards**: Real-time metrics and trending data
- **Portfolio Data**: Team and individual portfolio tracking
- **NAIC Codes**: Industry-standard insurance classification codes

## 🚀 Deployment

### Production Build
```bash
# Create optimized production build
ng build --configuration production

# Serve static files from dist/ directory
# Deploy to your preferred hosting platform
```

### Hosting Options
- **Angular Universal**: Server-side rendering support configured
- **Static Hosting**: Works with Netlify, Vercel, GitHub Pages
- **Cloud Platforms**: AWS S3, Azure Static Web Apps, Google Cloud

## 🔧 Configuration

### Environment Setup
The application is configured for development with:
- Hot module reloading
- Source maps for debugging
- TypeScript strict mode
- Angular DevKit optimizations

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 Performance Features

- **Lazy Loading**: Route-based code splitting
- **OnPush Change Detection**: Optimized rendering strategy
- **Tree Shaking**: Unused code elimination
- **AOT Compilation**: Ahead-of-time template compilation
- **Service Workers**: Ready for PWA implementation

## 🤝 Contributing

1. Follow Angular style guide conventions
2. Use TypeScript strict mode
3. Implement comprehensive responsive design
4. Add unit tests for new components
5. Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with Angular 20 and modern web standards
- Responsive design inspired by mobile-first principles
- Insurance domain expertise integrated throughout
- Accessibility considerations for enterprise use

---

**UW Hub** - Empowering underwriters with modern task management tools.