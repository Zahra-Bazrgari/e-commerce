export const groupBy = <T, K extends keyof any>(
  list: T[],
  keyGetter: (item: T) => K
): Record<K, T[]> => {
  return list.reduce((result, currentValue) => {
    const key = keyGetter(currentValue);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(currentValue);
    return result;
  }, {} as Record<K, T[]>);
};
