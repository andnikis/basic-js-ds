const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  head;

  constructor() {
    // queue is empty
    this.head = null;
  }

  getUnderlyingList() {
    return this.head;
  }

  enqueue(value) {
    let node = new ListNode(value);

    if (this.head === null)
      this.head = node;
    // find the last element
    else {
      let current = this.head;
      while (current.next !== null) current = current.next;
      current.next = node;
    }
  }

  dequeue() {
    if (this.head === null) return  undefined;

    // change the head
    let firstValue = this.head.value;
    this.head = this.head.next;

    return firstValue;
  }
}

module.exports = {
  Queue
};
