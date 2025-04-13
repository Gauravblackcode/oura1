import { useState } from 'react';

const useDataTableVisibilityHelper = () => {
  const [columnVisibility, setColumnVisibility] = useState({});

  const handleColumnVisibilityChange = (updater: any) => {
    if (typeof updater === 'function') {
      setColumnVisibility(old => updater(old));
    } else {
      setColumnVisibility(updater);
    }
  };

  return {
    handleColumnVisibilityChange,
    columnVisibility,
  };
};

export default useDataTableVisibilityHelper;
