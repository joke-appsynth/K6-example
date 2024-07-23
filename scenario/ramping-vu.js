import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  scenarios: {
    scenario1: {
      executor: 'ramping-arrival-rate',
      startRate: 300,
    //   timeUnit: '1m',
      preAllocatedVUs: 50,
      stages: [
        // Start 300 iterations per `timeUnit` for the first minute.
        { target: 300, duration: '5s' },

        // Linearly ramp-up to starting 600 iterations per `timeUnit` over the following two minutes.
        { target: 600, duration: '10s' },

        // Continue starting 600 iterations per `timeUnit` for the following four minutes.
        { target: 600, duration: '2s' },

        // Linearly ramp-down to starting 60 iterations per `timeUnit` over the last two minutes.
        { target: 60, duration: '5s' },
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

// https://k6.io/docs/using-k6/scenarios/executors/