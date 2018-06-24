/* eslint no-param-reassign: 0 */

class Node {
  constructor({
    value,
    key,
    previous = null,
    next = null,
  }) {
    this.value = value;
    this.key = key;
    this.previous = previous;
    this.next = next;
  }
}

const LRUCache = (maximumSize = 10) => (() => {
  const head = new Node({ value: null, key: null });
  const tail = new Node({ value: null, key: null });

  head.next = tail;
  tail.previous = head;

  const keysToNodes = new Map();

  /* Private Helper Methods */

  const removeNodeFromList = (node) => {
    if (node.previous) {
      node.previous.next = node.next;
    }

    if (node.next) {
      node.next.previous = node.previous;
    }
  };

  const removeNode = (node) => {
    removeNodeFromList(node);
    keysToNodes.delete(node.key);
  };

  const removeLeastRecentlyUsedNode = () => {
    const oldestNode = head.next;
    if (oldestNode !== tail) {
      removeNode(oldestNode);
    }
  };

  const addNode = (node) => {
    removeNodeFromList(node);

    const newestNode = tail.previous;

    newestNode.next = node;
    tail.previous = node;
    node.previous = newestNode;
    node.next = tail;

    keysToNodes.set(node.key, node);
  };

  /* Public API Methods */

  const getMaximumSize = () => maximumSize;

  const getSize = () => keysToNodes.size;

  const isEmpty = () => getSize() === 0;

  const getLeastRecentlyUsedEntry = () => {
    if (!isEmpty()) {
      const {
        key,
        value,
      } = head.next;
      return {
        key,
        value,
      };
    }
    return undefined;
  };

  const get = (key) => {
    const node = keysToNodes.get(key);

    if (node) {
      return node.value;
    }
    return undefined;
  };

  const getMostRecentlyUsedEntry = () => {
    if (!isEmpty()) {
      const {
        key,
        value,
      } = tail.previous;
      return {
        key,
        value,
      };
    }
    return undefined;
  };

  const set = ({ key, value }) => {
    let node = keysToNodes.get(key);

    if (node) {
      node.value = value;
      addNode(node);
    } else {
      node = new Node({ key, value });

      if (keysToNodes.size >= maximumSize) {
        removeLeastRecentlyUsedNode();
      }

      if (keysToNodes.size < maximumSize) {
        addNode(node);
      }
    }
  };

  const remove = (key) => {
    const node = keysToNodes.get(key);
    if (node) {
      removeNode(node);
    }
  };

  const clear = () => {
    keysToNodes.clear();
    head.next = tail;
    tail.previous = head;
  };

  return {
    clear,
    get,
    getLeastRecentlyUsedEntry,
    getMaximumSize,
    getMostRecentlyUsedEntry,
    getSize,
    isEmpty,
    set,
    remove,
  };
})();

export default LRUCache;
