import http from 'k6/http';
import { check, sleep } from 'k6';

// This code defines two scenarios with identical configurations, 
// each scenario will simulate 10 virtual users for a duration of 15 seconds using the 'constant-vus' executor.
export let options = {
  scenarios: {
    scenario1: {
        executor: 'constant-vus',
        vus: 10,
        duration: '15s',
    },
    scenario2: {
        executor: 'constant-vus',
        vus: 10,
        duration: '15s',
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

// https://k6.io/docs/using-k6/scenarios/executors/