[![Greenkeeper badge](https://badges.greenkeeper.io/jaebradley/simple-lru-cache.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/jaebradley/simple-lru-cache.svg?branch=master)](https://travis-ci.org/jaebradley/simple-lru-cache)
[![npm](https://img.shields.io/npm/v/@jaebradley/simple-lru-cache.svg)](https://www.npmjs.com/package/@jaebradley/simple-lru-cache)
[![npm](https://img.shields.io/npm/dt/@jaebradley/simple-lru-cache.svg)](https://www.npmjs.com/package/@jaebradley/simple-lru-cache)

# `@jaebradley/simple-lru-cache`

A simple Least Recently Used `(LRU)` Cache implemented mostly as an exercise.

The goal was to create a simple API with limited surface area to keep private variables and methods, private.

## Installation

```bash
npm i @jaebradley/simple-lru-cache --save
```

## API

### Import

```javascript
import LRUCache from '@jaebradley/simple-lru-cache';
```

### Cache Creation

**Note: The `LRUCache` function is NOT a `constructor` - do not use the `new` operator**

The `LRUCache` function takes a single `maximumSize` parameter that specifies the maximum number of entries the cache can hold. The `maximumSize` parameter must be an integer.

```javascript
const cache = LRUCache(); // cache with a maximum size of 10, by default

const smallCache = LRUCache(1); // cache with a maximum size of 1

const largeCache = LRUCache(1000000); // cache with a maximum size of one million
```

### `clear`

Clears all cache entries.

```javascript
const cache = LRUCache(123);
cache.set({ key: 'key', value: 'value' });
cache.isEmpty() // false
cache.clear();
cache.isEmpty() // true
```

### `get`

Gets the `value` associated with a cached `key`. If the specified `key` is not found within the cache, `undefined` is returned.

```javascript
const cache = LRUCache(123);
cache.set({ key: 'key', value: 'value' });
cache.get('key'); // 'value'
cache.get('foobar'); // undefined
```

### `getLeastRecentlyUsedEntry`

Returns the `key` and `value` that was least recently used. Will return `undefined` if no entry exists (i.e. when the cache is empty).

```javascript
const cache = LRUCache(123);
cache.getLeastRecentlyUsedEntry(); // undefined
cache.set({ key: 'key', value: 'value' });
cache.set({ key: 'anotherKey', value: 'anotherValue' });
cache.getLeastRecentlyUsedEntry(); // { key: 'key', value: 'value' }
```

### `getMaximumSize`

Gets the maximum number of cache entries which was specified at cache instantiation.

```javascript
const cache = LRUCache(123);
cache.getMaximumSize(); // 123
```

### `getMostRecentlyUsedEntry`

Returns the `key` and `value` that was most recently used. Will return `undefined` if no entry exists (i.e. when the cache is empty).

```javascript
const cache = LRUCache(123);
cache.getMostRecentlyUsedEntry(); // undefined
cache.set({ key: 'key', value: 'value' });
cache.set({ key: 'anotherKey', value: 'anotherValue' });
cache.getMostRecentlyUsedEntry(); // { key: 'anotherKey', value: 'anotherValue' }
```

### `getSize`

Gets the current size of the cache.

```javascript
const cache = LRUCache(123);
cache.getSize(); // 0
cache.set({ key: 'key', value: 'value' });
cache.getSize(); // 1
```

### `isEmpty`

Convenience method that returns `true` if cache is empty (i.e. the size of the cache is `0`) and `false` if the cache is not empty.

```javascript
const cache = LRUCache(123);
cache.isEmpty(); // true
cache.set({ key: 'key', value: 'value' });
cache.isEmpty(); //false
```

### `set`

Cache a `value` that is associated with a `key`. If the cache is at the maximum size, and a new entry is added to the cache, the least recently used entry will be evicted from the cache.

```javascript
const cache = LRUCache(1);
cache.set({ key: 'key', value: 'value' });
cache.get('key'); // 'value'
cache.set({ key: 'anotherKey', value: 'anotherValue' });
cache.get('key'); // undefined
cache.get('anotherKey'); // 'anotherValue'
```

### `remove`

Remove an entry from the cache.

```javascript
const cache = LRUCache(123);
cache.set({ key: 'key', value: 'value' });
cache.get('key'); // value
cache.remove('key');
cache.get('key'); // undefined
```
