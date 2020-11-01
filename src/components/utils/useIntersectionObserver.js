import * as React from "react";

/**
 * Applies an IntersectionObserver by returning a ref which when applied to an element can be reported if it's in view
 * Returns [ref, {boolean} isIntersecting]
 * @param {Object} observerOptions
 */
const useIntersectionObserver = (observerOptions) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const nodeRef = React.useRef(null);

  const onThresholdCrossAction = (entries) => {
    entries.forEach((entry) => {
      // Array of 1
      if (entry.isIntersecting) {
        if (!isIntersecting) {
          setIsIntersecting(true);
        }
      } else if (isIntersecting) {
        setIsIntersecting(false);
      }
    });
  };

  // Uses a ref so isIntersecting can be used without making setNodeRefCallback unstable
  const onThresholdCrossRef = React.useRef(onThresholdCrossAction);
  onThresholdCrossRef.current = onThresholdCrossAction;

  const intersectionObserverRef = React.useRef(null);

  // Only real dependency is observerOptions
  const setNodeRefCallback = React.useCallback(
    (newNode) => {
      if (nodeRef.current && newNode !== nodeRef.current) {
        // If node changed, unobserve old node
        if (intersectionObserverRef.current) {
          intersectionObserverRef.current.unobserve(nodeRef.current);
          nodeRef.current = null;
        }
      }

      if (newNode) {
        const newIntersectionObserver = new window.IntersectionObserver(
          (entries) => {
            onThresholdCrossRef.current(entries);
          },
          observerOptions
        );
        newIntersectionObserver.observe(newNode);
        intersectionObserverRef.current = newIntersectionObserver;
      } else {
        // No node
        setIsIntersecting(false);
      }
      nodeRef.current = newNode;
    },
    [intersectionObserverRef, nodeRef, observerOptions, onThresholdCrossRef]
  );

  // Cleanup if the component which is using this effect is being unmounted
  React.useEffect(() => {
    return () => {
      if (intersectionObserverRef.current && nodeRef.current) {
        intersectionObserverRef.current.unobserve(nodeRef.current);
      }
    };
  }, [nodeRef, intersectionObserverRef]);

  return [setNodeRefCallback, isIntersecting];
};
export default useIntersectionObserver;
