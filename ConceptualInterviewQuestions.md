1. Difference between useEffect, useLayoutEffect, and useInsertionEffect:  
useEffect: Runs after the DOM is painted  
           Most common – for data fetching, subscriptions, timers, etc.

useLayoutEffect: Runs synchronously after DOM mutations but before paint  
                 Used when you need to read layout/measures (e.g. for animations or DOM dimensions).  
useInsertionEffect: Runs before any DOM mutations  
                 Rare – used mostly by CSS-in-JS libraries to inject styles before DOM updates.

When to use:  
useEffect: 90% of the time – safe for async side effects.  
useLayoutEffect: When DOM measurement or mutation must happen before the browser paints.  
useInsertionEffect: For libraries that manipulate the DOM’s style tags early (not common in daily dev).

2. What are Higher-Order Components (HOCs)? How do they differ from Custom Hooks?  
A Higher-Order Component (HOC) is a function that takes a component and returns a new component with added behavior.

function withLogger(WrappedComponent) {  
  return function Enhanced(props) {  
    console.log("Rendered with props:", props);  
    return <WrappedComponent {...props} />;  
  };  
}

A Custom Hook is a reusable function that uses React hooks to encapsulate logic (without affecting the component tree).

function useAuth() {  
  const [user, setUser] = useState(null);  
  // logic here...  
  return { user };  
}  
Key Differences:  
HOCs wrap and return a component; custom hooks don’t return components.  
HOCs manipulate props or enhance rendering; hooks encapsulate logic and state.

3. How Context works in React & drawbacks in large-scale apps

React Context allows passing data deeply through the component tree without prop drilling.  
Basic flow:  
Create a context with React.createContext().  
Wrap components with a Provider.  
Use useContext() to access values.

Drawbacks in large-scale state management:  
Re-renders: Any change in context value causes all consuming components to re-render.  
No partial subscription: Components can’t subscribe to part of the state.  
Harder to scale/debug: Compared to Redux or Zustand, debugging large context trees can get complex.  
It's best for global, rarely-changing data like theme, locale, or auth state.

4. What is React's reconciliation process?  
Reconciliation is React’s way of updating the UI by comparing the new virtual DOM with the previous one.

React:  
Builds a virtual DOM tree.  
Diffs the new vs old tree (using keys and types).  
Calculates minimal changes.  
Updates only what's needed in the real DOM (efficient DOM updates).  
This process makes React fast and optimized, especially when using keys in lists and pure components.

5. How to prevent unnecessary re-renders in a functional component?  
You can prevent re-renders using:  
React.memo(Component) – avoids re-renders if props don’t change.  
useMemo() – memoizes expensive computations.  
useCallback() – memoizes functions so they’re not re-created on every render.  
Splitting components – isolate parts that don’t change often.  
Avoid inline functions and objects in props when possible.  
const memoizedValue = useMemo(() => computeExpensiveValue(input), [input]);

