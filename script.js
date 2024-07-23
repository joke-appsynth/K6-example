import http from 'k6/http';
import { check, sleep } from 'k6';

// This examples schedules 10 VUs to run constantly for a duration 30 seconds.
export let options = { discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
    },
  },
}

export default function () {
  let res = http.get('https://test.k6.io');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
