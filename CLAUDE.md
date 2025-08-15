# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `npm start` or `ng serve` - Start development server at http://localhost:4200
- `ng build` - Build the project for production
- `ng build --watch --configuration development` - Build with watch mode for development
- `ng generate component component-name` - Generate new components

### SSR Commands
- `npm run serve:ssr:ExampleWithFigma` - Serve the SSR build (requires build first)

## Architecture Overview

This is an Angular 20 application with the following key architectural features:

### Modern Angular Features
- **Zoneless Change Detection**: Uses `provideZonelessChangeDetection()` instead of Zone.js
- **Standalone Components**: All components use the new standalone API with `imports: []`
- **Lazy Loading**: Routes use `loadComponent()` for code splitting
- **Server-Side Rendering (SSR)**: Configured with Angular Universal and Express server
- **Signals**: Uses Angular signals (e.g., `signal('ExampleWithFigma')` in app component)

### TypeScript Configuration
- Strict TypeScript settings enabled
- Angular strict templates and injection parameters
- Target ES2022 with module preservation

### Figma Integration
- MCP server configured for Figma API integration in `.mcp.json`

## Code Style
- Uses Prettier with Angular HTML parser override
- Follows Angular style guide conventions
- Standalone component architecture throughout