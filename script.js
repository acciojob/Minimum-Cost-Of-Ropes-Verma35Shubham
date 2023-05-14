function calculateMinCost() {
  const ropeLengths = document.getElementById("rope-lengths").value;
  const lengths = ropeLengths.split(",").map(Number);

  const minCost = findMinCost(lengths);

  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `Minimum cost to connect ropes is: ${minCost}`;
}

function findMinCost(lengths) {
  if (lengths.length < 2) {
    return 0;
  }

  let totalCost = 0;

  // Create a min heap of the rope lengths
  const minHeap = new MinHeap(lengths);

  // Keep joining the two smallest ropes until we have only one rope left in heap
  while (minHeap.size() > 1) {
    const smallest = minHeap.extractMin();
    const secondSmallest = minHeap.extractMin();

    const currentCost = smallest + secondSmallest;
    totalCost += currentCost;

    minHeap.insert(currentCost);
  }

  return totalCost;
}

class MinHeap {
  constructor(arr = []) {
    this.heap = [null];

    // Insert all the elements in heap
    for (let i = 0; i < arr.length; i++) {
      this.insert(arr[i]);
    }
  }

  size() {
    return this.heap.length - 1;
  }

  // Get parent index of node
  parent(index) {
    return Math.floor(index / 2);
  }

  // Get left child index of node
  leftChild(index) {
    return index * 2;
  }

  // Get right child index of node
  rightChild(index) {
    return index * 2 + 1;
  }

  // Check if node at index i is leaf node
  isLeaf(index) {
    return (
      index > Math.floor(this.size() / 2) && index <= this.size()
    );
  }

  // Swap two nodes of heap
  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  // Insert a node into heap
  insert(value) {
    this.heap.push(value);

    let current = this.size();

    // Keep swapping with parent node if the value is smaller than parent
    while (
      current > 1 &&
      this.heap[current] < this.heap[this.parent(current)]
    ) {
      this.swap(current, this.parent(current));
      current = this.parent(current);
    }
  }

  // Extract the minimum element from heap
  extractMin() {
    const min = this.heap[1];

    // Move last element to root and remove it
    this.heap[1] = this.heap.pop();

    // Heapify the root element
    this.heapify(1);

    return min;
  }

  // Heapify the element at given index
  heapify(index) {
    if (!this.isLeaf(index)) {
      const leftChildIndex = this.leftChild(index);
      const rightChildIndex = this.rightChild(index);

      // Find the index of smallest child
      const smallestChildIndex =
        this.heap[leftChildIndex] < this.heap[rightChildIndex]
          ? leftChildIndex
          : rightChildIndex;

      // Swap with smallest child if parent is greater than smallest child
      if (this.heap[index] > this.heap[smallestChildIndex]) {
        this.swap(index, smallestChildIndex);
        this.heapify(smallestChildIndex);
      }
    }
  }
}

