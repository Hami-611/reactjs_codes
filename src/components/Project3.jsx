/* original code */ 
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
  }, []);

  return <div>Seconds: {seconds}</div>;
}

/* What is wrong in this:
Stale State Issue:
 setSeconds(seconds + 1) always uses the initial seconds value (0) due to the empty [] dependency array.
 As a result, seconds never increments beyond 1.

Missing Cleanup:
 setInterval is not cleared when the component unmounts, causing memory leaks. */

 /* Correct Version */
import { useEffect, useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1); // Use functional update
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return <div>Seconds: {seconds}</div>;
}

export default Timer;
