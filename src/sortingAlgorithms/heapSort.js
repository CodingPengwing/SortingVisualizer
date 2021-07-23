import { range, swap } from "./util";

var addStateToHistory;
var globallySorted;
var comparing;

export function sort(props) {
    globallySorted = [];
    comparing = [];
    addStateToHistory = props.addStateToHistory;
    // Do the sorting
    const sortedArray = heapSort(props.array);
    return sortedArray;
}

function heapSort(array) {
    if (array.length <= 1) return array;

    bottomUpHeapify(array);
    for (let i = array.length - 1; i > 0; i--) {
        comparing = [0, i];
        addStateToHistory(array, comparing, [], globallySorted);
        swap(array, 0, i);
        addStateToHistory(array, comparing, [], globallySorted);
        globallySorted.push(i);
        maxHeapify(array, 0, i);
    }

    // Here the entire array is sorted.
    addStateToHistory(array, [], [], range(0, array.length));
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
    if (lChild >= heapSize) {
        return array;
    }
    if (rChild >= heapSize) {
        rChild = lChild;
    }

    // Find the largest element between the parent, left and right children.
    comparing = [i, lChild, rChild];
    addStateToHistory(array, comparing, [], globallySorted);
    let largest = i;
    if (array[lChild] > array[largest]) {
        largest = lChild;
    }
    if (array[rChild] > array[largest]) {
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
    return array;
}
