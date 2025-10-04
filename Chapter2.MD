# Chapter 2 — React Native + TypeScript Learning Log

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

# React Native + TypeScript — Chapter 2 Continuation

This file continues from **Day 1** and documents your Day 2 questions, explanations, and multiple solution approaches for each topic.

---

## 🧩 1. Adding Another Declaration (e.g. JPEG) in `declaration.d.ts`

### ❓ Question:

> How to add another declaration in `declaration.d.ts`, for example, I want to add JPEG.

### 💡 Explanation:

TypeScript doesn’t know how to handle static assets like `.png`, `.jpg`, or `.jpeg` files by default. You must declare them manually so TypeScript recognizes imports such as `import image from '@assets/images/photo.jpeg'`.

### ✅ Possible Implementations:

#### **1. Add another `declare module` block**

```ts
// declaration.d.ts
declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.jpeg" {
  const value: any;
  export default value;
}
```

✅ Clean and explicit — good for few extensions.

---

#### **2. Combine multiple file extensions in one declaration**

```ts
declare module "*.{png,jpg,jpeg}" {
  const value: any;
  export default value;
}
```

✅ Compact and easier if you have many image formats.
❌ Slightly less readable.

---

#### **3. Use wildcard fallback**

```ts
declare module "*";
```

✅ Works for all unknown modules (images, SVGs, etc.)
❌ Too broad — TypeScript won’t catch typos or missing files.

---

## 🧩 2. Understanding `flex: 1` and `flexDirection: 'column'`

### ❓ Question:

> What does `flex: 1` do and why do we set `flexDirection: 'column'` in `<View>`?

### 💡 Explanation:

React Native uses Flexbox for layout. `flex: 1` tells a view to **expand to fill available space**, and `flexDirection: 'column'` arranges child elements **vertically**.

### ✅ Key Details:

- `flex: 1` → Makes a view grow to fill its parent.
- `flexDirection: 'column'` → Stacks children vertically (default in RN).

### ✅ Example:

```tsx
<View style={{ flex: 1, flexDirection: "column" }}>
  <Header />
  <Body />
  <Footer />
</View>
```

### 🔧 Alternative Implementations:

1. **Vertical layout (default)** — Stack top to bottom.
2. **Horizontal layout** (`flexDirection: 'row'`) — Side-by-side.
3. **Nested flex views** — Combine multiple views with different `flex` ratios.

| Property                  | Purpose              | Effect                 |
| ------------------------- | -------------------- | ---------------------- |
| `flex: 1`                 | Expand to fill space | Makes the view stretch |
| `flexDirection: 'column'` | Stack vertically     | Default layout         |
| `flexDirection: 'row'`    | Stack horizontally   | Row layout             |

---

## 🖼️ 3. Understanding `resizeMode: 'cover'`

### ❓ Question:

> What does `resizeMode: 'cover'` do?

### 💡 Explanation:

`resizeMode` defines how an image scales to fit its container. `cover` means the image scales **uniformly** to **completely fill** the container — cropping any overflow.

### ✅ Example:

```tsx
<Image
  source={require("@assets/images/iced-coffee.png")}
  style={{ width: 200, height: 200 }}
  resizeMode="cover"
/>
```

✅ The image fills the 200x200 box, maintaining aspect ratio but cropping edges.

### 🔧 Other `resizeMode` Options:

| Mode      | Scales | Keeps Ratio | Fills Box | Crops | Common Use            |
| --------- | ------ | ----------- | --------- | ----- | --------------------- |
| `cover`   | ✅     | ✅          | ✅        | ✅    | Backgrounds, banners  |
| `contain` | ✅     | ✅          | ❌        | ❌    | Logos, product images |
| `stretch` | ✅     | ❌          | ✅        | ❌    | Patterns, textures    |
| `center`  | ❌     | ✅          | ❌        | ❌    | Icons                 |
| `repeat`  | ✅     | ✅          | ✅        | ❌    | Textures, tiles       |

### ✅ Example with `ImageBackground`

```tsx
<ImageBackground
  source={require("@assets/images/iced-coffee.png")}
  resizeMode="cover"
  style={{ flex: 1 }}
>
  <Text style={{ color: "#fff" }}>Welcome to Coffee App</Text>
</ImageBackground>
```

✅ Perfect for full-screen backgrounds without distortion.

---

### ✅ Summary for Day 2

- Declaring additional image types helps TypeScript understand static assets.
- `flex: 1` + `flexDirection: 'column'` defines flexible and vertical layouts.
- `resizeMode: 'cover'` fills containers neatly, cropping extra parts.

---

**Next Topic for Day 3:** Handling Navigation Props and Passing Parameters Safely in TypeScript (React Naviga
