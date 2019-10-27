import { useCallback, useState } from 'react';

const useArray = initial => {
  const [value, setValue] = useState(initial);
  return {
    value,
    setValue,
    add: useCallback(a => setValue(v => [...v, a])),
    clear: useCallback(a => setValue(() => [])),
    removeById: useCallback(id =>
      setValue(arr => arr.filter(v => v && v.id !== id)),
    ),
    removeIndex: useCallback(index =>
      setValue(v => {
        v.splice(index, 1);
        return v;
      }),
    ),
  };
};

export default useArray;
