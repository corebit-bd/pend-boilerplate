# Icon Component

## 🎨 Placeholder Implementation

This Icon Component is a **Placeholder** Designed to be Replaced with Your Preferred Icon Library when Scaffolding a New Project.

## 🔧 Integration Options

Choose & Integrate One of the following Icon Libraries :

### Option 1 : Lucide React (Recommended)

Beautiful, Consistent & Lightweight.

```bash
npm install lucide-react
```

**Implementation** :

```typescript
import * as LucideIcons from "lucide-react";

const iconMap = {
  check: LucideIcons.Check,
  close: LucideIcons.X,
  // ... Add More Mappings
};

const IconComponent = iconMap[icon];
return <IconComponent className={sizeClasses[size]} />;
```

**Documentation** : https://lucide.dev

---

### Option 2 : React Icons

Access to Multiple Icon Sets (Font Awesome, Material, etc.).

```bash
npm install react-icons
```

**Implementation** :

```typescript
import { FaCheck, FaTimes } from "react-icons/fa";
import { MdHome, MdSearch } from "react-icons/md";

const iconMap = {
  check: FaCheck,
  close: FaTimes,
  // ... Add More Mappings
};
```

**Documentation** : https://react-icons.github.io/react-icons

---

### Option 3 : Heroicons

Beautiful Hand-Crafted SVG Icons by Tailwind CSS Team.

```bash
npm install @heroicons/react
```

**Implementation** :

```typescript
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const iconMap = {
  check: CheckIcon,
  close: XMarkIcon,
  // ... Add More Mappings
};
```

**Documentation** : https://heroicons.com

---

### Option 4 : Font Awesome

Popular, Extensive Icon Library.

```bash
npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
```

**Implementation** :

```typescript
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
```

**Documentation** : https://fontawesome.com/docs/web/use-with/react

---

### Option 5 : Custom SVG Sprites

Use Your Own Custom Icon Set.

**Implementation** :

```typescript
// Create SVG Sprite File
// Import & Render Based on Icon Name
```

---

## 📝 Current Usage

The Placeholder Implementation displays Icon Names as Text :

```tsx
<Icon icon="check" size="md" />
// Displays : '✓'

<Icon icon="user" size="lg" className="text-blue-600" />
// Displays : '👤'
```

## 🔄 After Integration

Once You Integrate an Icon Library, the Same Code will Render Actual Icons :

```tsx
<Icon icon="check" size="md" />
// Displays : ✓ (Actual Check Icon)

<Icon icon="user" size="lg" className="text-blue-600" />
// Displays : 👤 (Actual User Icon)
```

## 🎯 Recommended Approach

1. **Choose Your Icon Library** based on Project Needs
2. **Install the Package**
3. **Update `Icon.tsx`** Implementation
4. **Create Icon Mapping** for Commonly Used Icons
5. **Update Icon Tests** If Needed
6. **Icon Stories will Work Automatically**

## 💡 Example : Full Lucide Integration

**Step 1** : Installation

```bash
npm install lucide-react
```

**Step 2** : Update `src/components/ui/Icon.tsx`

```typescript
import * as React from "react";
import { cn } from "@/lib/utils/helpers";
import * as LucideIcons from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  check: LucideIcons.Check,
  close: LucideIcons.X,
  menu: LucideIcons.Menu,
  search: LucideIcons.Search,
  user: LucideIcons.User,
  settings: LucideIcons.Settings,
  home: LucideIcons.Home,
  "arrow-right": LucideIcons.ArrowRight,
  "arrow-left": LucideIcons.ArrowLeft,
  "chevron-down": LucideIcons.ChevronDown,
};

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ icon, size = "md", className, ...props }, ref) => {
    const IconComponent = iconMap[icon];

    if (!IconComponent) {
      console.warn(`Icon "${icon}" Not Found in iconMap`);
      return null;
    }

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center shrink-0",
          className
        )}
        aria-hidden="true"
        {...props}
      >
        <IconComponent className={sizeClasses[size]} />
      </span>
    );
  }
);
```

**Step 3** : Use It!

```tsx
<Button>
  <Icon icon="check" size="sm" className="mr-2" />
  Confirm
</Button>
```

---

## ✅ Benefits of This Approach

- 🎨 **Flexible** : Choose Any Icon Library
- 🔧 **Type-Safe** : Full TypeScript Support
- 📦 **Tree-Shakeable** : Only Bundle Icons You Use
- 🎯 **Consistent API** : Same Interface regardless of Library
- 🧪 **Already Tested** : Tests Work with any Implementation

---

## 📚 Additional Resources

- [Lucide Icons Browser](https://lucide.dev/icons/)
- [React Icons Gallery](https://react-icons.github.io/react-icons/)
- [Heroicons Gallery](https://heroicons.com/)
- [Font Awesome Gallery](https://fontawesome.com/icons)

---

**Ready to integrate?** Choose Your Library & Follow the Steps Above! 🚀
