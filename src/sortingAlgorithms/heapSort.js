import { swap } from "./util";

var addToHistory;

export function sort(props) {
    addToHistory = props.addToHistory;
    // Do the sorting
    const sortedArray = heapSort(props.array);
    // Finish the history by adding the final sorted array.
    addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

// This implementation of heap sort adds a sentinel to the start of the array.

function heapSort(array) {
    if (array.length <= 1) return array;

    // Add sentinel to top of list
    array.unshift(null);
    bottomUpHeapify(array);

    let heapSize = array.length;
    for (let i = array.length-1; i > 0; i--) {
        shiftThenAddToHistory({array: array.slice(), highlights: [1, i]});
        swap(array, 1, i);
        shiftThenAddToHistory({array: array.slice(), highlights: [1, i]});

        // Decrease the heapSize every time we eject an element to the bottom of the array.
        heapSize -= 1;
        maxHeapify(array, 1, heapSize);
    }

    // Remove the sentinel
    array.shift();
    return array;
}

// Turns the entire array into a heap
function bottomUpHeapify(array) {
    const n = array.length;
    const heapSize = n;
    for (let i = Math.floor(n/2); i > 0; i--) {
        maxHeapify(array, i, heapSize);
    }
}

// Ensures that all elements related to index i satisfy the conditions of a heap.
function maxHeapify(array, i, heapSize) {
    // If this element has no children
    if (i * 2 >= heapSize) return;

    // Find the children of this element
    let leftChild = 2 * i;
    // rightChild = leftChild if this element only has one child
    let rightChild = (2 * i + 1 < heapSize) ? 2 * i + 1 : leftChild;

    // Find the largest element between the parent, left and right children.
    shiftThenAddToHistory({array: array.slice(), highlights: [i, leftChild, rightChild]});
    let largest = i;
    if (array[leftChild] > array[i]) {
        largest = leftChild;
    }
    if (array[rightChild] > array[largest]) {
        largest = rightChild;
    }

    // Swap elements if a child is bigger than the parent
    if (largest !== i) {
        swap(array, i, largest);
        shiftThenAddToHistory({array: array.slice(), highlights: [i, largest]});
        // Heapify again for the child's children
        maxHeapify(array, largest, heapSize);
    }
}



// We have to remove the sentinel every time we add to history.
// All the highlight indices have been shifted -1 because of the removal of the sentinel.
function shiftThenAddToHistory(props) {
    props.array.shift();
    for (let i = 0; i < props.highlights.length; i++) {
        props.highlights[i] -= 1;
    }
    addToHistory({array: props.array, highlights: props.highlights});
}

