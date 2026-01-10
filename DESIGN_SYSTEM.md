# RouteWise Design System Documentation

## Overview

RouteWise is a Medical Admin Dashboard built with **Next.js 15.2.4**, using **TailwindCSS 3.x** for styling and **shadcn/ui** components. The template follows a modern design approach with full support for both light and dark themes.

---

## Typography & Fonts

### Primary Font

The application uses **Inter** as the primary typeface, loaded through Next.js's built-in Google Fonts optimization.

| Property       | Value                                    |
|----------------|------------------------------------------|
| **Font Family**| Inter                                    |
| **Fallback**   | Arial, Helvetica, sans-serif             |
| **Subsets**    | Latin                                    |
| **Loading**    | `next/font/google` (optimized)           |

#### Implementation (in `app/layout.tsx`):

```tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// Applied to body
<body className={inter.className}>
```

#### CSS Fallback (in `globals.css`):

```css
body {
  font-family: Arial, Helvetica, sans-serif;
}
```

---

## Color System

The application uses **HSL-based CSS custom properties** for colors, enabling seamless light/dark mode switching. All colors are defined in `app/globals.css` and consumed via Tailwind utilities.

### Light Mode Colors (`:root`)

| CSS Variable              | HSL Value              | Usage                              |
|---------------------------|------------------------|------------------------------------|
| `--background`            | `0 0% 100%`            | Page background                    |
| `--foreground`            | `0 0% 3.9%`            | Primary text color                 |
| `--card`                  | `0 0% 100%`            | Card background                    |
| `--card-foreground`       | `0 0% 3.9%`            | Card text color                    |
| `--popover`               | `0 0% 100%`            | Popover background                 |
| `--popover-foreground`    | `0 0% 3.9%`            | Popover text                       |
| `--primary`               | `0 0% 9%`              | Primary actions/buttons            |
| `--primary-foreground`    | `0 0% 98%`             | Text on primary                    |
| `--secondary`             | `0 0% 96.1%`           | Secondary backgrounds              |
| `--secondary-foreground`  | `0 0% 9%`              | Secondary text                     |
| `--muted`                 | `0 0% 96.1%`           | Muted backgrounds                  |
| `--muted-foreground`      | `0 0% 45.1%`           | Muted/placeholder text             |
| `--accent`                | `0 0% 96.1%`           | Accent elements                    |
| `--accent-foreground`     | `0 0% 9%`              | Accent text                        |
| `--destructive`           | `0 84.2% 60.2%`        | Destructive/error actions          |
| `--destructive-foreground`| `0 0% 98%`             | Text on destructive                |
| `--border`                | `0 0% 89.8%`           | Border color                       |
| `--input`                 | `0 0% 89.8%`           | Input border                       |
| `--ring`                  | `0 0% 3.9%`            | Focus ring                         |

### Dark Mode Colors (`.dark`)

| CSS Variable              | HSL Value              | Usage                              |
|---------------------------|------------------------|------------------------------------|
| `--background`            | `0 0% 3.9%`            | Page background                    |
| `--foreground`            | `0 0% 98%`             | Primary text color                 |
| `--card`                  | `0 0% 3.9%`            | Card background                    |
| `--card-foreground`       | `0 0% 98%`             | Card text color                    |
| `--popover`               | `0 0% 3.9%`            | Popover background                 |
| `--popover-foreground`    | `0 0% 98%`             | Popover text                       |
| `--primary`               | `0 0% 98%`             | Primary actions/buttons            |
| `--primary-foreground`    | `0 0% 9%`              | Text on primary                    |
| `--secondary`             | `0 0% 14.9%`           | Secondary backgrounds              |
| `--secondary-foreground`  | `0 0% 98%`             | Secondary text                     |
| `--muted`                 | `0 0% 14.9%`           | Muted backgrounds                  |
| `--muted-foreground`      | `0 0% 63.9%`           | Muted/placeholder text             |
| `--accent`                | `0 0% 14.9%`           | Accent elements                    |
| `--accent-foreground`     | `0 0% 98%`             | Accent text                        |
| `--destructive`           | `0 62.8% 30.6%`        | Destructive/error actions          |
| `--destructive-foreground`| `0 0% 98%`             | Text on destructive                |
| `--border`                | `0 0% 14.9%`           | Border color                       |
| `--input`                 | `0 0% 14.9%`           | Input border                       |
| `--ring`                  | `0 0% 83.1%`           | Focus ring                         |

### Chart Colors

| Variable       | Light Mode HSL      | Dark Mode HSL       |
|----------------|---------------------|---------------------|
| `--chart-1`    | `12 76% 61%`        | `220 70% 50%`       |
| `--chart-2`    | `173 58% 39%`       | `160 60% 45%`       |
| `--chart-3`    | `197 37% 24%`       | `30 80% 55%`        |
| `--chart-4`    | `43 74% 66%`        | `280 65% 60%`       |
| `--chart-5`    | `27 87% 67%`        | `340 75% 55%`       |

### Sidebar Colors

| Variable                      | Light Mode HSL        | Dark Mode HSL         |
|-------------------------------|-----------------------|-----------------------|
| `--sidebar-background`        | `0 0% 98%`            | `240 5.9% 10%`        |
| `--sidebar-foreground`        | `240 5.3% 26.1%`      | `240 4.8% 95.9%`      |
| `--sidebar-primary`           | `240 5.9% 10%`        | `224.3 76.3% 48%`     |
| `--sidebar-primary-foreground`| `0 0% 98%`            | `0 0% 100%`           |
| `--sidebar-accent`            | `240 4.8% 95.9%`      | `240 3.7% 15.9%`      |
| `--sidebar-accent-foreground` | `240 5.9% 10%`        | `240 4.8% 95.9%`      |
| `--sidebar-border`            | `220 13% 91%`         | `240 3.7% 15.9%`      |
| `--sidebar-ring`              | `217.2 91.2% 59.8%`   | `217.2 91.2% 59.8%`   |

---

## Spacing & Border Radius

### Border Radius

| Token | Value                       | Tailwind Class  |
|-------|-----------------------------|-----------------|
| `lg`  | `var(--radius)` (0.5rem)    | `rounded-lg`    |
| `md`  | `calc(var(--radius) - 2px)` | `rounded-md`    |
| `sm`  | `calc(var(--radius) - 4px)` | `rounded-sm`    |

**Base Radius:** `--radius: 0.5rem` (8px)

---

## Responsive Breakpoints

| Breakpoint | Min Width | Usage               |
|------------|-----------|---------------------|
| `sm`       | `576px`   | Small devices       |
| `md`       | `768px`   | Tablets             |
| `lg`       | `992px`   | Desktops            |
| `xl`       | `1200px`  | Large desktops      |
| `xxl`      | `1400px`  | Extra large screens |
| `3xl`      | `1600px`  | Wide screens        |
| `4xl`      | `1800px`  | Ultra-wide screens  |

---

## Theme Configuration

### Default Theme

| Property          | Value   |
|-------------------|---------|
| **Default Theme** | `dark`  |
| **System Theme**  | Disabled|
| **Theme Attribute**| `class`|

The theme is managed using **next-themes** with the following configuration:

```tsx
<NextThemeProvider enableSystem={false} defaultTheme="dark" attribute="class">
  {children}
</NextThemeProvider>
```

### Dark Mode

Dark mode is configured via the `class` strategy in Tailwind:

```ts
// tailwind.config.ts
darkMode: ["class"]
```

---

## Animations

### Built-in Keyframes

| Animation Name    | Description                            | Duration |
|-------------------|----------------------------------------|----------|
| `accordion-down`  | Expands accordion content from 0       | 0.2s     |
| `accordion-up`    | Collapses accordion content to 0       | 0.2s     |

### Animation Plugin

The template uses `tailwindcss-animate` for additional animation utilities.

---

## Component Library

### UI Framework

- **Component Library:** shadcn/ui
- **Style Variant:** `default`
- **Icon Library:** Lucide React
- **CSS Variables:** Enabled
- **Base Color:** `neutral`

### Component Aliases

| Alias         | Path               |
|---------------|--------------------|
| `@/components`| `./components`     |
| `@/components/ui` | `./components/ui` |
| `@/lib`       | `./lib`            |
| `@/hooks`     | `./hooks`          |

### Utility Function

The `cn()` function combines `clsx` and `tailwind-merge` for conditional class composition:

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Key Dependencies

| Package                  | Version    | Purpose                        |
|--------------------------|------------|--------------------------------|
| `next`                   | `15.2.4`   | React framework                |
| `react`                  | `^19`      | UI library                     |
| `tailwindcss`            | `^3.4.17`  | CSS framework                  |
| `next-themes`            | `^0.4.4`   | Theme management               |
| `lucide-react`           | `^0.454.0` | Icon library                   |
| `recharts`               | `2.15.0`   | Charts/graphs                  |
| `react-day-picker`       | `9.6.7`    | Date picker                    |
| `react-hook-form`        | `^7.54.1`  | Form handling                  |
| `zod`                    | `^3.24.1`  | Schema validation              |
| `sonner`                 | `^1.7.1`   | Toast notifications            |
| `embla-carousel-react`   | `8.5.1`    | Carousel/slider                |
| `tailwindcss-animate`    | `^1.0.7`   | Animation utilities            |

---

## Configuration Files Summary

| File                  | Purpose                                       |
|-----------------------|-----------------------------------------------|
| `tailwind.config.ts`  | Tailwind CSS configuration & theme tokens     |
| `app/globals.css`     | Global CSS & CSS custom properties            |
| `components.json`     | shadcn/ui configuration                       |
| `next.config.mjs`     | Next.js configuration                         |
| `postcss.config.mjs`  | PostCSS configuration for Tailwind            |
| `lib/provider.tsx`    | Theme provider wrapper                        |

---

## Next.js Configuration

| Option                | Value   | Purpose                        |
|-----------------------|---------|--------------------------------|
| `eslint.ignoreDuringBuilds` | `true` | Skip ESLint during builds |
| `typescript.ignoreBuildErrors` | `true` | Skip TS errors during builds |
| `images.unoptimized`  | `true`  | Disable Next.js image optimization |

---

## Usage Guidelines

### Adding Custom Colors

To add new colors, extend the CSS variables in `app/globals.css`:

```css
:root {
  --custom-color: 210 80% 50%;
}
.dark {
  --custom-color: 210 80% 40%;
}
```

Then reference in Tailwind config:

```ts
colors: {
  custom: 'hsl(var(--custom-color))'
}
```

### Creating Themed Components

Always use semantic color tokens instead of hard-coded colors:

```tsx
// ✅ Good
<div className="bg-background text-foreground border-border" />

// ❌ Avoid
<div className="bg-white text-black border-gray-200" />
```

---

*Document generated: January 9, 2026*
