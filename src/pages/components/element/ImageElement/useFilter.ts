import React from 'react';
import { ImageElementFilters } from '@/types/slides';

export default (filters: ImageElementFilters | undefined) => {
  const filter = React.useMemo(() => {
    if (!filters) return '';
    let filter = '';
    for (const key of Object.keys(filters)) {
      filter += `${key}(${filters[key]}) `;
    }
    return filter;
  }, [filters]);

  return {
    filter,
  };
};
