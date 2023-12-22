const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  rootNode;

  constructor() {
    this.setRoot(null);
  }

  root() {
    return this.rootNode;
  }

  setRoot(node) {
    this.rootNode = node;
  }

  isEmpty() {
    return this.isEmptyNode(this.root());
  }

  isEmptyNode(node) {
    return node === null;
  }

  add(data) {
    let node = new Node(data);

    if (this.isEmpty()) {
      this.setRoot(node);
    }
    else {
      let currentNode = this.root();

      // insert new node and return
      do {
        if (data >= currentNode.data) {
          if (this.isEmptyNode(currentNode.right)) {
            currentNode.right = node;
            return this;
          }
          currentNode = currentNode.right;
        }
        else {
          if (this.isEmptyNode(currentNode.left)) {
            currentNode.left = node;
            return this;
          }
          currentNode = currentNode.left;
        }
      } while (true);
    }
  }

  has(data) {
    return !this.isEmptyNode(this.find(data));
  }

  find(data) {
    if (this.isEmpty()) return null;

    let currentNode = this.root();
    do {
      if (currentNode.data === data) return currentNode;

      if (data >= currentNode.data)
        currentNode = currentNode.right
      else
        currentNode = currentNode.left;

    } while (!this.isEmptyNode(currentNode));

    return null;
  }

  remove(/* data */) {
    throw new NotImplementedError('Not implemented');
    // remove line with error and write your code here
  }

  min() {
    if (this.isEmpty()) return null;

    let currentNode = this.root();
    let minValue = currentNode.data;
    do {
      currentNode = currentNode.left;
      if (this.isEmptyNode(currentNode)) break;
      if (currentNode.data < minValue) minValue = currentNode.data;
    } while (true);

    return minValue;
  }

  max() {
    if (this.isEmpty()) return null;

    let currentNode = this.root();
    let maxValue = currentNode.data;
    do {
      currentNode = currentNode.right;
      if (this.isEmptyNode(currentNode))
        break;
      if (currentNode.data > maxValue) maxValue = currentNode.data;
    } while (true);

    return maxValue;
  }
}

// const tree = new BinarySearchTree();
// tree.add(9);
// tree.add(14);
// tree.add(54);
// tree.add(2);
// tree.add(6);
// tree.add(8);
// tree.add(31);
// tree.add(1);
// console.log(tree.max());

module.exports = {
  BinarySearchTree
};