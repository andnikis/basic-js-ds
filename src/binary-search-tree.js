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

  findWithParent(data) {
    if (this.isEmpty()) return null;

    let currentNode = this.root();
    let parentNode = null;

    do {
      if (currentNode.data === data)
        return { parentNode, currentNode };

      parentNode = currentNode;
      if (data >= currentNode.data)
        currentNode = currentNode.right
      else
        currentNode = currentNode.left;

    } while (!this.isEmptyNode(currentNode));

    return null;
  }

  find(data) {
    let nodes = this.findWithParent(data);
    // nodes is object or empty node
    if (this.isEmptyNode(nodes))
      return null;

    let { currentNode } = nodes;
    return currentNode;
  }

  remove(data) {
    let nodes = this.findWithParent(data);

    // nodes is object or empty node
    if (!this.isEmptyNode(nodes)) {
      let { parentNode, currentNode } = nodes;

      if (this.isEmptyNode(currentNode.left) && this.isEmptyNode(currentNode.right)) {
        if (currentNode === this.root())
          this.setRoot(null)
        else {
          if (parentNode.left === currentNode)
            parentNode.left = null;
          else
            parentNode.right = null;
        }
      }
      else if (this.isEmptyNode(currentNode.left)) {
        if (currentNode === this.root())
          this.setRoot(currentNode.right);
        else if (parentNode.left === currentNode)
          parentNode.left = currentNode.right;
        else
          parentNode.right = currentNode.right;
      }
      else if (this.isEmptyNode(currentNode.right)) {
        if (currentNode === this.root())
          this.setRoot(currentNode.left);
        else if (parentNode.left === currentNode)
          parentNode.left = currentNode.left;
        else
          parentNode.right = currentNode.left;
      }
      else {
        let removedNode = currentNode;

        // left node can be used
        if (this.isEmptyNode(currentNode.left.right)) {
          removedNode.data = currentNode.left.data;
          removedNode.left = currentNode.left.left;
          console.log('', { removedNode, currentNode });
        }

        // find the last right node from the left
        else {
          parentNode = currentNode;
          currentNode = currentNode.left;

          while (!this.isEmptyNode(currentNode.right)) {
            parentNode = currentNode;
            currentNode = currentNode.right;
          }

          // set data from the last right node to removedNode
          removedNode.data = currentNode.data;
          // it can be not null
          parentNode.right = currentNode.left;
        }
      }
    }
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

module.exports = {
  BinarySearchTree
};