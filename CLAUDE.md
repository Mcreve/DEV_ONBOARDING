# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive web application called "AI-Enhanced Development: Your Interactive Guide" - a static website that educates developers about AI tools and concepts. It requires no build process and can be served directly from any web server.

## Development Commands

Since this is a static site with no build system:
- **Run locally**: Open `ai-dev-interactive-blog-optimized.html` in a browser or use a simple HTTP server like `python -m http.server 8000`
- **No build/compilation needed** - Changes to HTML/CSS/JS are immediately reflected
- **No tests** - This is a content-focused static site
- **No linting configured** - Consider using browser developer tools for debugging

## Architecture and Structure

### File Organization
```
/
├── ai-dev-interactive-blog-optimized.html  # Main entry point (use this version)
├── ai-dev-interactive-blog (1).html        # Original version with inline styles
├── styles.css                              # All styling, includes dark/light themes
├── script.js                               # All interactivity and functionality
└── compass_artifact_*.md                   # Content files (not directly used)
```

### Key Architectural Decisions

1. **No Framework Approach**: Pure vanilla JavaScript for maximum compatibility and zero dependencies
2. **Theme System**: CSS variables enable dark/light mode switching stored in localStorage
3. **Navigation Pattern**: Sticky navbar with smooth scrolling and active state management via Intersection Observer
4. **Performance**: Throttled scroll events and lazy section animations using requestAnimationFrame

### Core Functionality in script.js

- **Theme Toggle**: `toggleTheme()` function manages dark/light mode persistence
- **Navigation**: Smooth scrolling with active link highlighting based on scroll position
- **Progress Bar**: Visual reading progress indicator updated on scroll
- **Token Demo**: Interactive demonstration of AI tokenization (the "strawberry problem")
- **Code Copying**: All code blocks have copy functionality
- **Expandable Sections**: "Learn More" sections for detailed content

### CSS Architecture

- **CSS Variables**: Theme colors defined as custom properties for easy switching
- **Mobile-First**: Responsive breakpoints starting from mobile screens
- **Component Classes**: `.card`, `.feature-card`, `.code-block` for consistent styling
- **Utility Classes**: `.expand-btn`, `.copy-btn` for interactive elements

### Content Sections

1. **Home**: Introduction and overview
2. **Tokens**: How AI processes text, includes interactive demo
3. **Context Windows**: Understanding AI memory limitations
4. **MCP**: Model Context Protocol explanation
5. **Setup**: Getting started guide
6. **Action**: Call-to-action and next steps

### Important Considerations

- **No State Management**: All state is either in DOM or localStorage (theme only)
- **Event Delegation**: Most event handlers are attached directly, not delegated
- **Accessibility**: Semantic HTML used but could benefit from ARIA labels
- **Browser Support**: Modern browsers only (uses ES6+ features)