import Benchmark from 'benchmark';
import { LRUMap } from 'lru_map';
import QuickLRU from 'quick-lru';
import cache from '../build/index';

const suite = new Benchmark.Suite('simple-lru-cache');

const iterations = 100000;

suite
  .add('simple-lru-cache', () => {
    const c = cache(1);
    for (let i = 0; i < iterations; i += 1) {
      c.set({ key: i, value: i });
    }
  })
  .add('lru_map', () => {
    const c = new LRUMap(1);
    for (let i = 0; i < iterations; i += 1) {
      c.set({ key: i, value: i });
    }
  })
  .add('quick-lru', () => {
    const c = new QuickLRU({maxSize: 1});
    for (let i = 0; i < iterations; i += 1) {
      c.set({ key: i, value: i });
    }
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', function () {
    const benchTest1 = this[0]; // gets benchmark for test1
    const benchTest2 = this[1]; // gets benchmark for test2

    console.log(benchTest1.hz); // ops/sec
    // benchmark info in format:
    // test2 x 1,706,681 ops/sec ±1.18% (92 runs sampled)
    console.log(benchTest2.hz);

    // console.log('Fastest is ' + JSON.stringify(this.filter('fastest'), null, 2));
  })
  .run({ async: true });
