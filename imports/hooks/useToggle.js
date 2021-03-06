import { useCallback, useState } from 'react';


export default (initial) => {
  const [value, setValue] = useState(initial);

  const toggle = useCallback((nextValue) => {
    if (typeof nextValue !== 'undefined') { // close or open
      setValue(!!nextValue);
      return;
    }

    setValue(newValue => !newValue);        // toggle
  }, [])

  return [value, toggle]
}