import { useState } from 'react';

export default function useGlobalModel() {
  const [screening, setScreen] = useState(false);

  return { screening, setScreen };
}
