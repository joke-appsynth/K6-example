import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  scenarios: {
    scenario1: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '5s', target: 10}, // Ramp-up to 10 users in 5s
        { duration: '5s', target: 50 }, // Ramp-up to 50 users in 5s
        { duration: '10s', target: 2}, // Ramp-down to 2 users in 10s
      ],
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