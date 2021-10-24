import React from 'react';

const customHook = (refs) => {
  const [params, setParams] = React.useState({
    a: 1,
  });

  const updateParams = (val: any) => {
    refs.current = 10;
    setParams(val);
  };

  return {
    params,
    updateParams,
  };
};

export default customHook;
