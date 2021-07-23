import { swap } from "./util";

var addStateToHistory;
var globallySorted;
var comparing;

export function sort(props) {
    globallySorted = [];
    comparing = [];
    addStateToHistory = props.addStateToHistory;
    // Do the sorting
    const sortedArray = heapSort(props.array);
    // Finish the history by adding the final sorted array.
    addStateToHistory(sortedArray, [], [], []);
    return sortedArray;
}

function heapSort(array) {
    if (array.length <= 1) return array;

    bottomUpHeapify(array);
    for (let i = array.length - 1; i > 0; i--) {
        comparing = [0, i];
        addStateToHistory(array, comparing, [], globallySorted);
        swap(array, 0, i);
        globallySorted.push(i);
        addStateToHistory(array, comparing, [], globallySorted);
        maxHeapify(array, 0, i);
    }

    return array;
}

// Turns the entire array into a heap
function bottomUpHeapify(array) {
    const n = array.length;
    for (let i = Math.floor(n/2) - 1; i >= 0; i--) {
        maxHeapify(array, i, n);
    }
}

// Ensures that all elements related to index i satisfy the conditions of a heap.
function maxHeapify(array, i, heapSize) {
    // Find the children of this element
    let lChild = 2 * i + 1;
    let rChild = 2 * i + 2;

    // Find the largest element between the parent, left and right children.
    comparing = [i, lChild, rChild];
    addStateToHistory(array, comparing, [], globallySorted);
    let largest = i;
    if (lChild < heapSize && array[lChild] > array[largest]) {
        largest = lChild;
    }
    if (rChild < heapSize && array[rChild] > array[largest]) {
        largest = rChild;
    }

    // Swap elements if a child is bigger than the parent
    if (largest !== i) {
        swap(array, i, largest);
        comparing = [i, largest];
        addStateToHistory(array, comparing, [], globallySorted);
        // Heapify again for the child's children
        maxHeapify(array, largest, heapSize);
    }
}
