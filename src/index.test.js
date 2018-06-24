import LRUCache from '.';

describe('LRUCache', () => {
  let cache;

  const key = 'key';
  const value = 'value';
  const anotherKey = 'anotherKey';
  const anotherValue = 'anotherValue';

  const entry = { key, value };
  const anotherEntry = { key: anotherKey, value: anotherValue };
  const isEmptyCache = () => {
    expect(cache.getSize()).toEqual(0);
    expect(cache.isEmpty()).toEqual(true);
    expect(cache.getLeastRecentlyUsedEntry()).toBeUndefined();
    expect(cache.getMostRecentlyUsedEntry()).toBeUndefined();
  };

  describe('#constructor', () => {
    it('constructs default cache', () => {
      cache = LRUCache();
      expect(cache.getMaximumSize()).toEqual(10);
      isEmptyCache();
    });

    it('constructs cache with a maximum size of 1', () => {
      cache = LRUCache(1);
      expect(cache.getMaximumSize()).toEqual(1);
      isEmptyCache();
    });
  });

  describe('#set', () => {
    it('adds single element to cache', () => {
      cache = LRUCache(10);
      cache.set(entry);
      expect(cache.getLeastRecentlyUsedEntry()).toEqual(entry);
      expect(cache.getMostRecentlyUsedEntry()).toEqual(entry);
      expect(cache.get(key)).toEqual(value);
      expect(cache.getSize()).toEqual(1);
    });

    it('adds two elements to cache', () => {
      cache = LRUCache(2);
      cache.set(entry);
      cache.set(anotherEntry);

      expect(cache.getSize()).toEqual(2);
      expect(cache.getLeastRecentlyUsedEntry()).toEqual(entry);
      expect(cache.getMostRecentlyUsedEntry()).toEqual(anotherEntry);
    });

    it('evicts element from cache after maximum limit is met', () => {
      cache = LRUCache(1);
      cache.set(entry);
      cache.set(anotherEntry);

      expect(cache.getLeastRecentlyUsedEntry()).toEqual(anotherEntry);
      expect(cache.getMostRecentlyUsedEntry()).toEqual(anotherEntry);
      expect(cache.get(anotherKey)).toEqual(anotherValue);
      expect(cache.get(key)).toBeUndefined();
      expect(cache.getSize()).toEqual(1);
    });

    it('adds element with same key to cache', () => {
      cache = LRUCache(2);
      cache.set(entry);
      cache.set(anotherEntry);

      const entry3 = { key, value: anotherValue };
      cache.set(entry3);

      expect(cache.getSize()).toEqual(2);
      expect(cache.get(key)).toEqual(anotherValue);
      expect(cache.getMostRecentlyUsedEntry()).toEqual(entry3);
      expect(cache.getLeastRecentlyUsedEntry()).toEqual(anotherEntry);
    });

    it('does not add elements for cache with maximum size of 0', () => {
      cache = LRUCache(0);

      cache.set({ key, value });

      expect(cache.getSize()).toEqual(0);
      expect(cache.get(key)).toBeUndefined();
      expect(cache.getLeastRecentlyUsedEntry()).toBeUndefined();
      expect(cache.getMostRecentlyUsedEntry()).toBeUndefined();
    });
  });

  describe('#get', () => {
    it('gets null for key that does not exist', () => {
      cache = LRUCache(10);
      cache.set(entry);
      expect(cache.get(anotherEntry.key)).toBeUndefined();
    });

    it('gets value for key that exists', () => {
      cache = LRUCache(10);
      cache.set(entry);
      expect(cache.get(entry.key)).toEqual(entry.value);
    });
  });

  describe('#remove', () => {
    it('removes element from single element cache', () => {
      cache = LRUCache(10);
      cache.set(entry);
      cache.remove(key);

      expect(cache.getSize()).toEqual(0);
      expect(cache.get(key)).toBeUndefined();
    });

    it('removes element from two element cache', () => {
      cache = LRUCache(2);
      cache.set(entry);
      cache.set(anotherEntry);
      cache.remove(key);

      expect(cache.getLeastRecentlyUsedEntry()).toEqual(anotherEntry);
      expect(cache.getMostRecentlyUsedEntry()).toEqual(anotherEntry);
      expect(cache.getSize()).toEqual(1);
    });

    it('does not remove element that does not exist from populated cache', () => {
      cache = LRUCache(1);
      cache.set(entry);
      cache.remove(anotherEntry);

      expect(cache.getSize()).toEqual(1);
      expect(cache.get(key)).toEqual(value);
    });

    it('does not remove element that does not exist from empty cache', () => {
      cache = LRUCache(10);
      cache.remove(entry);

      expect(cache.getSize()).toEqual(0);
      expect(cache.getLeastRecentlyUsedEntry()).toBeUndefined();
      expect(cache.getMostRecentlyUsedEntry()).toBeUndefined();
    });
  });

  describe('#clear', () => {
    it('clears an empty cache', () => {
      cache = LRUCache(10);
      cache.clear();
      isEmptyCache();
    });

    it('clears a populated cache', () => {
      cache = LRUCache(10);
      cache.set(entry);
      cache.clear();
      expect(cache.get(entry.key)).toBeUndefined();
      isEmptyCache();
    });

    it('clears a populated cache and adds elements', () => {
      cache = LRUCache(10);
      cache.set(entry);
      cache.clear();
      cache.set(entry);
      expect(cache.get(entry.key)).toEqual(entry.value);
      expect(cache.getSize()).toEqual(1);
      expect(cache.getLeastRecentlyUsedEntry()).toEqual(entry);
      expect(cache.getMostRecentlyUsedEntry()).toEqual(entry);
    });
  });

  describe('API reassignment', () => {
    it('reassigns #getSize but #isEmpty is still correct', () => {
      cache = LRUCache(10);
      cache.getSize = () => 10;
      expect(cache.getSize()).toEqual(10);
      expect(cache.isEmpty()).toEqual(true);
    });
  });
});
