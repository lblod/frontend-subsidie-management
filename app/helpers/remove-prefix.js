import { helper } from '@ember/component/helper';

export default helper(function removePrefix([string, prefix]) {
  if (typeof string !== 'string' || typeof prefix !== 'string') {
    return string;
  }
  if (string.startsWith(prefix)) {
    return string.slice(prefix.length).trim();
  }
  return string;
});
