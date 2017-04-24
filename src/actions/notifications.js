var cuid = require('cuid')

export function show(opts = {}, level = 'success') {
  return {
    type: 'RNS_SHOW_NOTIFICATION',
    ...opts,
    uid: cuid(),
    level
  };
}

export function success(opts) {
  return show(opts, 'success');
}

export function error(opts) {
  return show(opts, 'error');
}
