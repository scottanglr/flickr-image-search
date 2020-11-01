import * as React from "react";

/**
 * Returns what the value was on the previous render
 * @param {*} value
 * @return {*} Previous value. If this is the first render, then the previous value is undefined
 */
const usePreviousValue = (value) => {
  const ref = React.useRef();
  const previousValue = ref.current;
  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return previousValue;
};

/**
 * If the current value changes from a specified value to another specified value, run the callback
 * @param {*} from - From this value
 * @param {*} to - To this value
 * @param {*} current - The value to watch
 * @param {() => void} callback - The callback to run. Doesn't have to be stable, but if it is then comparison checks can be prevented
 */
export const useCallbackWhen = (from, to, current, callback) => {
  const prevValue = usePreviousValue(current);
  React.useEffect(() => {
    if (prevValue === from && current === to) {
      callback();
    }
  }, [current, prevValue, from, to, callback]);
};

export default useCallbackWhen;
