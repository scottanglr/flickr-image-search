import * as React from "react";
import { supportsPassiveEvents } from "detect-passive-events";

/**
 * Returns whether the screen matches mobile (less than 768px) or not
 * It updates when screen size is changed and uses a passive listener for best performance
 */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  // A ref callback must be used since it needs to watch isMobile to cut out unnecessary setStates
  // And must also be stable so that the handler is not removed and applied on isMobile change

  const onResizeCallbackRef = React.useRef();
  onResizeCallbackRef.current = () => {
    // Don't call set state unless the value changed. This prevents unnecessary re-renders
    if (window.innerWidth < 768) {
      if (!isMobile) {
        setIsMobile(true);
      }
    } else {
      if (isMobile) {
        setIsMobile(false);
      }
    }
  };

  // On mount setup listener
  React.useEffect(() => {
    const onResizeCallback = () => {
      onResizeCallbackRef.current();
    };
    window.addEventListener(
      "resize",
      onResizeCallback,
      // Marking it as passive greatly speeds up the performance of the resize handler
      // The trade off is that the event can't be blocked, which is not an issue here
      // It's important to detect the feature because if the {passive: true} argument is
      // Provided to old browsers they will assume capture as true
      supportsPassiveEvents ? { passive: true } : false
    );
    return () => {
      window.removeEventListener("resize", onResizeCallback);
    };
  }, [onResizeCallbackRef]);

  return isMobile;
};

export default useIsMobile;
