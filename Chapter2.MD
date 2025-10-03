# Day 2 — React Native + TypeScript Learning Log

This README collects the questions asked and their solutions for **Day 2** of learning React Native with TypeScript.

---

## 1. TypeScript Error with Image Import

**Question:**

```ts
import icedCoffeeImage from "@assets/images/iced-coffee.png";
```

Error:

```
Cannot find module '@assets/images/iced-coffee.png' or its corresponding type declarations
```

**Solutions:**

- **Option 1: Add declaration.d.ts**

```ts
// declaration.d.ts
declare module "*.png" {
  const value: any;
  export default value;
}
```

Why: Teaches TypeScript how to handle `.png` imports.

- **Option 2: Use `require()`**

```tsx
<Image source={require("@assets/images/iced-coffee.png")} />
```

Why: React Native’s Metro bundler natively resolves `require()` for images.

- **Option 3: Configure alias paths**
  In `tsconfig.json`:

```json
"paths": {
  "@assets/*": ["src/assets/*"]
}
```

And in `babel.config.js`:

```js
plugins: [["module-resolver", { alias: { "@assets": "./assets" } }]];
```

Why: Ensures both TypeScript and Metro understand `@assets` alias.

---

## 2. How `declaration.d.ts` Works

**Question:** How does this work?

```ts
declare module "*.png" {
  const value: any;
  export default value;
}
```

**Answer:**

- `declare module '*.png'`: tells TypeScript that any file ending with `.png` is a valid import.
- `const value: any;`: describes the exported value (loose type).
- `export default value;`: allows `import x from '...'` syntax.

TypeScript doesn’t load the image, it only stops complaining. React Native’s bundler still handles the actual image at runtime.

---

## 3. `<Text>` Component Error

**Question:**

```
No overload matches this call...
```

When adding props to `<Text>`.

**Solutions:**

- **Option 1: Use valid Text props only**

```tsx
<Text style={{ color: "red" }}>Hello</Text>
```

- **Option 2: Create a custom Text wrapper**

```tsx
import { Text, TextProps } from "react-native";

type CustomTextProps = TextProps & { variant?: "title" | "body" };

const CustomText: React.FC<CustomTextProps> = ({ variant, ...props }) => (
  <Text {...props} />
);
```

- **Option 3: Cast props when experimenting**

```tsx
<Text {...({ myCustomProp: "test" } as any)}>Hello</Text>
```

(Not recommended for production.)

- **Option 4: Fix invalid children type**

```tsx
<Text>{String(123)}</Text>
```

Why: `children` must be `string | ReactNode`.

---

## 4. Metro Bundler Error with Aliases

**Question:**

```
Unable to resolve "@assets/images/iced-coffee.png"
```

**Solutions:**

- **Option 1: Use relative imports**

```tsx
import icedCoffeeImage from "../../assets/images/iced-coffee.png";
```

- **Option 2: Configure Metro & Babel alias**
  Add to `babel.config.js`:

```js
plugins: [["module-resolver", { alias: { "@assets": "./assets" } }]];
```

Also set up `tsconfig.json` paths.

- **Option 3: Use `require()` directly**

```tsx
<ImageBackground source={require("../../assets/images/iced-coffee.png")} />
```

- **Option 4: Combine declaration + alias setup** for scalable imports.

---

## 5. Missing `splash` in `app.json`

**Question:** Why can’t I find the `splash` key in `app.json`?

**Answer:**

- New Expo projects often generate a minimal `app.json` with no `splash` by default.
- If using `app.config.js`, Expo ignores `app.json`.
- You must add the splash field manually:

```json
{
  "expo": {
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    }
  }
}
```

---

# ✅ Summary

- TypeScript needs help understanding assets (`declaration.d.ts`).
- Metro requires proper alias setup or relative paths.
- `<Text>` props must be valid unless you extend them.
- Expo `splash` config must be added manually.

This file serves as a quick **review reference** for Day 2 errors and solutions.
