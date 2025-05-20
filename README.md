Here's your content formatted neatly for a `README.md` file section:

````markdown
## React Concepts: Deep Dive

### Difference between `useEffect`, `useLayoutEffect`, and `useInsertionEffect`

| Hook               | Timing                                 | Use Case                                               |
|--------------------|----------------------------------------|---------------------------------------------------------|
| `useEffect`        | Runs **after** the DOM is painted      | Most common – for data fetching, subscriptions, timers |
| `useLayoutEffect`  | Runs **synchronously after DOM mutations**, but **before paint** | For layout reads/measures (e.g., animations, DOM dimensions) |
| `useInsertionEffect` | Runs **before** any DOM mutations   | Rare – used by CSS-in-JS libraries for style injection |

#### When to Use:
- **`useEffect`**: 90% of the time – safe for async side effects.
- **`useLayoutEffect`**: When layout needs to be measured or mutated **before** paint.
- **`useInsertionEffect`**: For injecting styles early – not common in daily dev work.

---

### 🏗Higher-Order Components (HOCs) vs Custom Hooks

#### Higher-Order Components (HOCs)
A **HOC** is a function that takes a component and returns a new component with added behavior.

```js
function withLogger(WrappedComponent) {
  return function Enhanced(props) {
    console.log("Rendered with props:", props);
    return <WrappedComponent {...props} />;
  };
}
````

#### Custom Hooks

A **custom hook** is a function that encapsulates and reuses logic using React’s hooks.

```js
function useAuth() {
  const [user, setUser] = useState(null);
  // logic here...
  return { user };
}
```

#### Key Differences:

* HOCs **wrap and return** a component; custom hooks **don’t return components**.
* HOCs manipulate **props/rendering**; hooks encapsulate **logic and state**.

---

### How React Context Works (and its Drawbacks)

**React Context** lets you pass data deeply without manually drilling props.

#### Basic Flow:

1. Create context using `React.createContext()`
2. Wrap components in a `<Provider>`
3. Access via `useContext(MyContext)`

#### Drawbacks in Large-Scale Apps:

* **Re-renders**: All consumers re-render on any change.
* **No partial subscriptions**: Can't subscribe to part of the state.
* **Debugging complexity**: Harder to scale/debug than libraries like Redux or Zustand.

> Best used for **rarely-changing global state** like theme, locale, or auth info.

---

### React's Reconciliation Process

**Reconciliation** is how React efficiently updates the UI:

1. Builds a new **Virtual DOM**.
2. **Diffs** it against the previous Virtual DOM.
3. Calculates **minimal DOM updates**.
4. Updates only the necessary parts of the **real DOM**.

> This makes React performant. Use **keys** in lists and **pure components** for optimal diffing.

---

### Preventing Unnecessary Re-renders

Tips to avoid wasteful re-renders in functional components:

* `React.memo(Component)` – skip re-render if props haven’t changed.
* `useMemo()` – memoize expensive values:

  ```js
  const memoizedValue = useMemo(() => computeExpensiveValue(input), [input]);
  ```
* `useCallback()` – memoize functions to prevent re-creation.
* **Split components** – isolate changing vs static parts.
* Avoid **inline objects/functions** in props.

---
