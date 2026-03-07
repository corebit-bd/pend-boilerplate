# PEND Frontend - NextJS Application

## 📋 Overview

The frontend is built with NextJS 16 and provides a modern, performant, and type-safe Web Application for the PEND boilerplate. It implements a component-driven architecture with comprehensive testing, state management & design system integration.

## 🏗️ Architecture

### Core Technologies

- **NextJS 16** - React Framework with App Router
- **TypeScript 5** - Type Safety & Developer Experience
- **Tailwind CSS v4.2** - Utility-First CSS Framework (PostCSS-Based)
- **Redux Toolkit** - Centralized State Management
- **React Hook Form** - Performant Form Handling
- **Zod** - Schema Validation
- **Axios** - HTTP Client for API Communication
- **Storybook 10.0.4 (NextJS + Vite Builder)** - Component Documentation & Development

### Design Principles

- **Component-Driven** - Reusable, Tested UI Components
- **Type-Safe** - 100% TypeScript Coverage
- **Test-Driven** - 99.78% Test Coverage on User Interface (UI) Components
- **Design System First** - Complete Figma Design System Integrated
- **API-First** - Clean Separation of Concerns with API Layer
- **State Management** - Redux Toolkit for Predictable State Updates

## 📁 Directory Structure

```
frontend/
├── src/
│   ├── app/                         # NextJS App Router
│   │   ├── layout.tsx               # Root Layout (Open Sans Font)
│   │   ├── page.tsx                 # Home Page
│   │   ├── globals.css              # Global Styles + Design System
│   │   ├── (auth)/                  # Auth Route Group
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/             # Dashboard Route Group
│   │   │   ├── layout.tsx
│   │   │   └── dashboard/
│   │   └── api/                     # API Routes (If Needed)
│   │
│   ├── components/
│   │   ├── ui/                     # Base User Interface (UI) Components
│   │   │   ├── __tests__/          # Component Tests
│   │   │   │   ├── Badge.test.tsx  # 27 Tests
│   │   │   │   ├── Button.test.tsx # 22 Tests
│   │   │   │   ├── Icon.test.tsx   # 25 Tests
│   │   │   │   ├── Input.test.tsx  # 43 Tests
│   │   │   │   └── Spinner.test.tsx # 39 Tests
│   │   │   ├── Badge.tsx
│   │   │   ├── Badge.stories.tsx   # 15 Stories
│   │   │   ├── Button.tsx
│   │   │   ├── Button.stories.tsx  # 17 Stories
│   │   │   ├── Icon.tsx            # Placeholder for Icon Library
│   │   │   ├── Icon.stories.tsx    # 14 Stories
│   │   │   ├── Input.tsx
│   │   │   ├── Input.stories.tsx   # 21 Stories
│   │   │   ├── Spinner.tsx
│   │   │   └── Spinner.stories.tsx # 16 Stories
│   │   ├── features/               # Feature-Specific Components
│   │   │   ├── auth/               # Auth Components
│   │   │   ├── dashboard/          # Dashboard Components
│   │   │   └── user/               # User Components
│   │   └── Providers.tsx           # Redux Provider Wrapper
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   └── client.ts           # Axios API Client
│   │   ├── constants/
│   │   │   └── api.ts              # API Endpoints & Configuration
│   │   └── utils/
│   │       ├── helpers.ts          # Utility Functions
│   │       └── cn.ts               # ClassName Utility (clsx + tailwind-merge)
│   │
│   ├── store/
│   │   ├── index.ts                # Redux Store Configuration
│   │   └── slices/
│   │       ├── authSlice.ts        # Authentication State
│   │       └── userSlice.ts        # User State
│   │
│   ├── hooks/                      # Custom ReactJS Hooks
│   │   ├── useAuth.ts
│   │   ├── useUser.ts
│   │   └── useApi.ts
│   │
│   ├── types/                      # TypeScript Type Definitions
│   │   ├── auth.ts
│   │   ├── user.ts
│   │   └── api.ts
│   │
│   └── schemas/                    # Zod Validation Schemas
│       ├── authSchemas.ts
│       └── userSchemas.ts
│
├── public/                          # Static Assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── cypress/                         # End-to-End Tests
│   ├── e2e/
│   │   ├── auth.cy.ts
│   │   └── dashboard.cy.ts
│   ├── fixtures/
│   └── support/
│
├── .storybook/                      # Storybook Configuration
│   ├── main.ts
│   └── preview.ts
│
├── .env.local                       # Local Environment (gitignored)
├── .env.local.example               # Environment Template
├── .eslintrc.json                   # ESLint Configuration
├── .gitignore                       # Git Ignore Rules
├── cypress.config.ts                # Cypress Configuration
├── jest.config.ts                   # Jest Configuration
├── jest.setup.ts                    # Jest Setup
├── next.config.ts                   # NextJS Configuration
├── package.json                     # Dependencies
├── postcss.config.mjs               # Tailwind v4 PostCSS Configuration
├── tsconfig.json                    # TypeScript Configuration
├── Dockerfile                       # Docker Image
└── README.md                        # This File
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+ / yarn 1.22+
- Backend API Running (http://localhost:8000)

### Initial Setup

#### Option 1 : Using Setup Script (Recommended)

```bash
# From Project Root
./scripts/setup.sh
```

#### Option 2 : Manual Setup

```bash
# 1. Navigate to "frontend" Directory
cd frontend

# 2. Install Dependencies
npm install

# 3. Copy Environment File
cp .env.local.example .env.local

# 4. Update ".env.local" with your Configuration

# 5. Run Development Server
npm run dev
```

### Configuration

#### Environment Variables (`.env.local`)

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8000/graphql
NEXT_PUBLIC_FASTAPI_URL=http://localhost:8001

# Authentication
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000

# Environment
NODE_ENV=development

# Feature Flags (optional)
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_DEBUG=true
```

#### NextJS Configuration (`next.config.ts`)

The Configuration includes :

- API Rewrites for Proxying Backend Requests
- Image Optimization Settings
- TypeScript Strict Mode
- Environment Variable Validation

## 🔧 Development

### Running the Development Server

```bash
# Start Development Server
npm run dev

# Or Using the Development Script (From Project Root)
./scripts/dev-start.sh
```

The Application will be available at :

- Frontend : http://localhost:3000
- Hot Reload : Enabled
- Fast Refresh : Enabled

### Running Storybook

```bash
# Start Storybook Development Server
npm run storybook

# Build Storybook Static Site
npm run build-storybook
```

Storybook will be available at : http://localhost:6006

### Building for Production

```bash
# Build Production Bundle
npm run build

# Start Production Server
npm start

# Or Using Build Script (From Project Root)
./scripts/build.sh --frontend-only
```

## 🧪 Testing

### Unit & Integration Tests (Jest)

```bash
# Run All Tests
npm test

# Run in Watch Mode
npm run test:watch

# Run with Coverage
npm run test:coverage

# Run Specific Test File
npm test -- Button.test.tsx

# Run Tests Matching Pattern
npm test -- --testNamePattern="Button"

# Update Snapshots
npm test -- -u
```

### Test Coverage

Current Coverage : **99.78%** on User Interface (UI) Components

```
components/ui    | 99.78% | 66.66% | 100% | 99.78%
  Badge.tsx      | 100%   | 100%   | 100% | 100%
  Button.tsx     | 100%   | 28.57% | 100% | 100%
  Icon.tsx       | 100%   | 100%   | 100% | 100%
  Input.tsx      | 99.24% | 93.75% | 100% | 99.24%
  Spinner.tsx    | 100%   | 100%   | 100% | 100%
```

### End-to-End (E2E) Tests (Cypress)

```bash
# Open Cypress Test Runner
npm run cypress:open

# Run Cypress Tests Headlessly
npm run cypress:run

# Run Specific Test File
npm run cypress:run -- --spec "cypress/e2e/auth.cy.ts"
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint Issues
npm run lint:fix

# Type Check
npm run type-check

# Format with Prettier (If Configured)
npm run format
```

## 🎨 Design System

### Tailwind CSS v4 Integration

The Design System is fully integrated in `src/app/globals.css` using Tailwind v4's PostCSS-Based Configuration.

#### Color Palette

```css
/* Primary Colors */
--color-primary-50: #f0f9ff --color-primary-500: #3b82f6
  --color-primary-900: #1e3a8a /* Semantic Colors */ --color-success: #10b981
  --color-warning: #f59e0b --color-error: #ef4444 --color-info: #3b82f6;
```

#### Typography

- **Primary Font** : Open Sans (Configured in `layout.tsx`)
- **Font Weights** : 300, 400, 600, 700
- **Font Sizes** : xs, sm, base, lg, xl, 2xl, 3xl, 4xl

#### Spacing Scale

- Based on 4px Base Unit
- Consistent Spacing : 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px

#### Component Variants

All UI Components support Consistent Variants :

- **Button** : `primary`, `secondary`, `outline`, `tertiary`, `link`
- **Badge** : `default`, `success`, `warning`, `error`, `information`
- **Input** : Multiple Types with Validation States
- **Spinner** : Inline, Overlay, Full-Screen

### Using the Design System

```tsx
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

function MyComponent() {
  return (
    <>
      <Button variant="primary" size="md">
        Click Me
      </Button>

      <Badge variant="success" size="sm">
        Active
      </Badge>

      <Input
        type="email"
        label="Email Address"
        placeholder="Enter Your Email Address"
        error="Invalid Email Address"
      />
    </>
  );
}
```

## 🔄 State Management

### Redux Store Structure

```typescript
store/
├── index.ts             # Store Configuration
└── slices/
    ├── authSlice.ts     # Authentication State
    └── userSlice.ts     # User State
```

### Using Redux

```tsx
import { useAppSelector, useAppDispatch } from "@/store";
import { loginUser } from "@/store/slices/authSlice";

function LoginForm() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleLogin = async (credentials) => {
    await dispatch(loginUser(credentials));
  };

  return (
    // Your Form JSX
  );
}
```

### Available Actions

**`authSlice`** :

- `loginUser` - Authenticate User
- `logoutUser` - Clear Authentication State
- `refreshToken` - Refresh JWT Token

**`userSlice`** :

- `fetchUserProfile` - Get User Data
- `updateUserProfile` - Update User Data
- `clearUserData` - Clear User State

## 📡 API Integration

### API Client (Axios)

Located in `src/lib/api/client.ts` :

```typescript
import apiClient from "@/lib/api/client";

// GET Request
const response = await apiClient.get("/users/profile");

// POST Request
const response = await apiClient.post("/auth/login", {
  email: "user@example.com",
  password: "password123",
});

// PUT Request
const response = await apiClient.put("/users/profile", userData);

// DELETE Request
const response = await apiClient.delete("/users/123");
```

### API Constants

Located in `src/lib/constants/api.ts` :

```typescript
export const API_ENDPOINTS = {
  BASE_URL: "http://localhost:8000/api/v1",
  GRAPHQL_URL: "http://localhost:8000/graphql",
  FASTAPI_URL: "http://localhost:8001",
} as const;

export const API_TIMEOUT = 10000; // 10 Seconds

export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  REFRESH: "/auth/refresh",
  ME: "/users/me",
} as const;

export const USER_ENDPOINTS = {
  ME: "/users/me",
  BY_ID: (id: string) => `/users/${id}`,
  LIST: "/users",
  UPDATE_ME: "/users/me",
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
} as const;
```

### Error Handling

The API Client includes Automatic Error Handling :

- Request / Response Interceptors
- Token Refresh on 401 Errors
- Automatic Retry Logic
- Error Logging & Reporting

## ✅ Form Validation (Zod)

### Validation Schemas

Located in `src/schemas/` :

```typescript
import { loginSchema } from "@/schemas/authSchemas";

// Validate Data
const result = loginSchema.safeParse(formData);

if (!result.success) {
  console.error(result.error.errors);
} else {
  // Use Validated Data
  const validatedData = result.data;
}
```

### Using with React Hook Form

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/authSchemas";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log(data); // Type-Safe & Validated
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register("password")} type="password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Login</button>
    </form>
  );
}
```

## 🎯 Component Development

### Creating a New Component

```bash
# 1. Create Component File
touch src/components/ui/MyComponent.tsx

# 2. Create Test File
touch src/components/ui/__tests__/MyComponent.test.tsx

# 3. Create Storybook Story
touch src/components/ui/MyComponent.stories.tsx
```

### Component Template

```tsx
// src/components/ui/MyComponent.tsx
import { cn } from "@/lib/utils/cn";

interface MyComponentProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

export function MyComponent({
  variant = "primary",
  size = "md",
  className,
  children,
}: MyComponentProps) {
  return (
    <div
      className={cn(
        "my-component-base-styles",
        {
          "variant-primary": variant === "primary",
          "variant-secondary": variant === "secondary",
          "size-sm": size === "sm",
          "size-md": size === "md",
          "size-lg": size === "lg",
        },
        className,
      )}
    >
      {children}
    </div>
  );
}
```

### Test Template

```tsx
// src/components/ui/__tests__/MyComponent.test.tsx
import { render, screen } from "@testing-library/react";
import { MyComponent } from "../MyComponent";

describe("MyComponent", () => {
  it("Renders Children Correctly", () => {
    render(<MyComponent>Test Content</MyComponent>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("Applies Variant Styles", () => {
    const { container } = render(
      <MyComponent variant="secondary">Test</MyComponent>,
    );
    expect(container.firstChild).toHaveClass("variant-secondary");
  });
});
```

### Storybook Template

```tsx
// src/components/ui/MyComponent.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "./MyComponent";

const meta: Meta<typeof MyComponent> = {
  title: "UI/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Component",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Component",
  },
};
```

## 🎨 Icon Library Integration

The Boilerplate includes a Placeholder Icon Component that can be integrated with any icon library. See `src/components/ui/Icon.README.md` for Detailed Integration Guides for :

- **Lucide React** (Recommended)
- **React Icons**
- **Heroicons**
- **Font Awesome**
- **Custom SVG Sprites**

### Quick Integration Example (Lucide React)

```bash
npm install lucide-react
```

```tsx
// Update src/components/ui/Icon.tsx
import * as LucideIcons from "lucide-react";

export function Icon({ name, size = 20, className }: IconProps) {
  const IconComponent = LucideIcons[name];
  return <IconComponent size={size} className={className} />;
}

// Usage
<Icon name="User" size={24} />
<Icon name="Search" className="text-blue-500" />
```

## 🐳 Docker

### Building the Image

```bash
# From Project Root
docker-compose build frontend
```

### Running with Docker Compose

```bash
# Start All Services
docker-compose up -d

# View Logs
docker-compose logs -f frontend

# Access Shell
docker-compose exec frontend sh
```

### Dockerfile

The Dockerfile uses Multi-Stage Builds :

- **Stage 1** : Dependencies Installation
- **Stage 2** : Build Production Bundle
- **Stage 3** : Production Runtime with Minimal Image Size

## 🚀 Production Deployment

### Pre-Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure Production API URLs
- [ ] Set `NEXTAUTH_SECRET` with Strong Value
- [ ] Enable Production Optimizations
- [ ] Test Production Build Locally
- [ ] Run All Tests : `npm test`
- [ ] Check Bundle Size : `npm run build`
- [ ] Verify Environment Variables
- [ ] Setup Error Tracking (Sentry, etc.)
- [ ] Configure CDN for Static Assets
- [ ] Enable HTTPS
- [ ] Setup Monitoring & Analytics

### Production Build

```bash
# Build Production Bundle
npm run build

# Analyze Bundle Size
npm run analyze  # If Configured

# Start Production Server
npm start
```

### Environment Variables (Production)

```bash
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1
NEXT_PUBLIC_GRAPHQL_URL=https://api.yourdomain.com/graphql
NEXTAUTH_SECRET=your-strong-production-secret
NEXTAUTH_URL=https://yourdomain.com
```

### Deployment Platforms

**Vercel (Recommended for NextJS)** :

```bash
# Install Vercel CLI
npm install -g vercel

# Deployment
vercel

# Deploy to Production Environment
vercel --prod
```

**Docker** :

```bash
# Build Production Image
docker build -t pend-frontend:latest .

# Run Container
docker run -p 3000:3000 pend-frontend:latest
```

**AWS / GCP / Azure** :

- Use Provided Dockerfile
- Configure Container Orchestration (ECS, Cloud Run, etc.)
- Setup Load Balancer & CDN
- Configure Auto-Scaling

## 📊 Performance

### Optimization Techniques

- **Code Splitting** - Automatic with NextJS
- **Image Optimization** - NextJS Image Component
- **Font Optimization** - `next/font` with Open Sans
- **Tree Shaking** - Dead Code Elimination
- **Lazy Loading** - Dynamic Imports for Heavy Components
- **Memoization** - `React.memo`, `useMemo`, `useCallback`

### Monitoring Performance

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Bundle Analyzer
npm run analyze  # If Configured
```

### Performance Targets

- **First Contentful Paint (FCP)** : < 1.8s
- **Time to Interactive** : < 3.8s
- **Largest Contentful Paint (LCP)** : < 2.5s
- **Cumulative Layout Shift (CLS)** : < 0.1
- **First Input Delay (FID)** : < 100ms

## 📝 Common Tasks

### Adding a New Page

```bash
# Create Page Component
mkdir -p src/app/my-page
touch src/app/my-page/page.tsx

# Add Page Content
# src/app/my-page/page.tsx
export default function MyPage() {
  return <div>My New Page</div>;
}
```

### Adding a New API Route

```bash
# Create API Route
mkdir -p src/app/api/my-endpoint
touch src/app/api/my-endpoint/route.ts

# Add Route Handler
# src/app/api/my-endpoint/route.ts
export async function GET(request: Request) {
  return Response.json({ data: "Hello from PEND" });
}
```

### Adding a New Redux Slice

```bash
# Create Slice File
touch src/store/slices/mySlice.ts

# Add Slice to Store
# src/store/index.ts
import myReducer from "./slices/mySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    my: myReducer, // Add Here
  },
});
```

## 🐛 Troubleshooting

### Common Issues

**❌ Issue : "Module not found: Can't resolve '`@/...`'"**

```bash
# ✅ Solution : Check "tsconfig.json" paths Configuration
# Ensure "baseUrl" & "paths" are set correctly
```

**❌ Issue : "Hydration failed because the initial UI does not match..."**

```bash
# ✅ Solution : Ensure no Client-Only Code runs during Server-Side Rendering (SSR)
# Use Dynamic Imports with "ssr: false" for Client-Only Components
import dynamic from "next/dynamic";
const ClientComponent = dynamic(() => import("./ClientComponent"), {
  ssr: false
});
```

**❌ Issue : "API request failed with `401 Unauthorized`"**

```bash
# ✅ Solution : Check if Token is valid & backend is running
# Verify "NEXT_PUBLIC_API_URL" in ".env.local"
# Check Redux DevTools for Auth State
```

**❌ Issue : "Cannot find module `react` or its corresponding type declarations"**

```bash
# ✅ Solution : Reinstall Dependencies
rm -rf node_modules package-lock.json
npm install
```

**❌ Issue : "Storybook build fails"**

```bash
# ✅ Solution : Clear Storybook Cache
npm run storybook -- --no-manager-cache
```

**❌ Issue : "Tests failing with `Cannot find module` errors"**

```bash
# ✅ Solution : Check "jest.config.ts" moduleNameMapper
# Ensure paths match "tsconfig.json"
```

## 📚 Dependencies

### Production Dependencies

```json
{
  "next": "^16.1.1",
  "react": "^19.2.3",
  "react-dom": "^19.2.4",
  "@reduxjs/toolkit": "^2.9.2",
  "react-redux": "^9.2.0",
  "axios": "^1.13.6",
  "zod": "^4.3.6",
  "react-hook-form": "^7.71.2",
  "@hookform/resolvers": "^5.2.2",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.4.0",
  "@types/react-redux": "^7.1.34",
  "tar": "^7.5.7"
}
```

### Development Dependencies

```json
{
  "@testing-library/react": "^16.3.0",
  "@testing-library/jest-dom": "^6.9.1",
  "@testing-library/user-event": "^14.6.1",
  "jest": "^30.2.0",
  "jest-environment-jsdom": "^30.2.0",
  "@types/jest": "^30.0.0",
  "cypress": "^15.6.0",
  "eslint": "9.21.0",
  "eslint-config-next": "^16.1.6",
  "@types/node": "^25",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "typescript": "^5.0.0"
}
```

## 📖 Additional Resources

- [NextJS Documentation](https://nextjs.org/docs)
- [ReactJS Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Storybook Documentation](https://storybook.js.org/docs)
- [Testing Library Documentation](https://testing-library.com/docs/)
- [Cypress Documentation](https://docs.cypress.io/)

## 🤝 Contributing

1. Create a `feature` Branch : `feature/username/story-id-description`
2. Make Your Changes
3. Write / Update Tests : `npm test`
4. Update Storybook Stories if Adding / Modifying User Interface (UI) components
5. Run Linting : `npm run lint`
6. Check Types : `npm run type-check`
7. Commit with Conventional Commits: `feature (#Issue Reference, if any) : Created A New Component`
8. Push & Create A Pull Request (PR)

### Commit Label Tags Convention

- `feature` : Indication of New Feature or Functionality or a significant enhancement into the system
- `fix` : Signifies Bug or Error Fixes in the system
- `documentation` : Changes to the Documentation File(s)
- `style` : Addition / Changes to Design Styles of the Application User Interface (UI) / User Experience (UX)
- `refactor` : Code Refactoring (Variable Renaming / Code Restructuring or Formatting) that doesn't affect Functionality
- `data` : Used for Database, Information & Data Manipulation
- `test` : Adding, Fixing or Modifying Tests; No Production Code Change
- `chore` : Updating Build Scripts / Upgrading Dependencies, Maintenance & Changes in Tools; No Production Code Change
- `cicd` : Changes to CI/CD Configuration or Scripts
- `performance` : Performance Improvements / Optimization Changes
- `devEx` : Developers' Experience : Use for Improvement of Developers' Experience. Mostly Used in Issue Creation that might help Developers during Design & Development.
- `revert` : Undoing the Changes made by a Previous Commit
- `miscellaneous` : Use for anything that does not clearly fall into any of the previous categories

## 📄 License

PEND is licensed under the MIT License. See the [LICENSE](LICENSE) File for more details.
