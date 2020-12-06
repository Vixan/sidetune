import { useEffect, useRef } from "react";
import window from "global";

const useEventListener = (
  eventName: "mousemove" | "mouseup",
  handler: (event: Event) => void
) => {
  const savedHandler = useRef((_: Event) => {});

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Create an event listener that calls handler function stored in ref
      const eventListener = (event: Event) => savedHandler.current(event);

      window.addEventListener(eventName, eventListener, { passive: false });

      return () => {
        window.removeEventListener(eventName, eventListener);
      };
    }
  }, [eventName]);
};

export default useEventListener;
