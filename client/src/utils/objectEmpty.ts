// TODO: could be removed, not used anywhere currently
export const objectEmpty = (obj: Record<string, any>): boolean => {
  return obj.constructor === Object && Object.keys(obj).length === 0;
};
