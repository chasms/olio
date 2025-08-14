import cuid from 'cuid';

export function show(options = {}, level = 'success') {
  return {
    type: 'RNS_SHOW_NOTIFICATION',
    ...options,
    uid: cuid(),
    level,
  };
}

export function success(options) {
  return show(options, 'success');
}

export function error(options) {
  return show(options, 'error');
}
