## React Essentials: useEffect vs useLayoutEffect vs useInsertionEffect

### useEffect
- Runs **after the DOM is painted**.
- Ideal for: fetching data, setting up subscriptions, timers, etc.
- Usage: most side effects – you'll use this 90% of the time.

### useLayoutEffect
- Executes **right after DOM mutations but before paint**.
- Good when you need to **measure layout or make DOM changes before the browser repaints**.
- Example: animations, reading element dimensions.

### useInsertionEffect
- Runs **before any DOM mutations**.
- Mostly used by **CSS-in-JS libraries** to inject styles early.
- Rare in day-to-day work.

---

## When to Use What
- **useEffect**: Default choice for async tasks and general side effects.
- **useLayoutEffect**: Use only when timing is critical for layout-related changes.
- **useInsertionEffect**: Advanced – mostly for library authors.

---
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
