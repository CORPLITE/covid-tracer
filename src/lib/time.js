import moment from 'moment-timezone';

function timezone(time) {
  return moment.tz(time, 'Australia/Melbourne').format('LLLL');
}

export { timezone };
