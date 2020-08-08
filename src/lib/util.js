export function toBoolean(val) {
  if (val === '') return val;
  // eslint-disable-next-line eqeqeq
  return val === 'true' || val == '1';
}
