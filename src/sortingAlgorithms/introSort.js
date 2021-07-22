import { swap } from "./util";

var addToHistory;

export function sort(props) {
    addToHistory = props.addToHistory;
    const start = 0;
    const end = props.array.length;
    // Initialize the depthLimit as log(length(data))
    const depthLimit = Math.floor(Math.log2(end - start));
    // Do the sorting
    const sortedArray = introSort(props.array, start, end, depthLimit);
    // Finish the history by adding the final sorted array.
    addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

// Intro sort from start (inclusive) to end (exclusive)
function introSort(array, start, end, depthLimit) {
    var size = end - start;
    // If the array is smaller than 16, sort with insertion sort
    if (size < 16) {
        return insertionSort(array, start, end);
    }
    // If we have reached max recursion depth, use heap sort
    if (depthLimit === 0) {
        return heapSort(array, start, end);
    }
    // Otherwise partition the array and go ahead
    const p = partition(array, start, end);
    introSort(array, start, p, depthLimit-1);
    introSort(array, p+1, end, depthLimit-1);

    return array;
}




// ------------------------------------- Heap Sort ------------------------------------- //

// Function to sort an array from start (inclusive) to end (exclusive).
function heapSort(array, start, end) {
    if (end <= start) return array;

    var arrayLength = end - start + 1;
    var offset = start - 1;
    bottomUpHeapify(array, start, end);

    let heapSize = arrayLength;
    for (let i = arrayLength - 1; i > 0; i--) {
        addToHistory({array: array.slice(), highlights: [1 + offset, i + offset]});
        // Eject an element to the end of the heap.
        swap(array, 1 + offset, i + offset);
        addToHistory({array: array.slice(), highlights: [1 + offset, i + offset]});

        // Decrease the heapSize every time we eject an element to the bottom of the heap.
        heapSize -= 1;
        maxHeapify(array, start, end, 1, heapSize);
    }

    return array;
}

// Turns the entire array into a heap
function bottomUpHeapify(array, start, end) {
    const n = end - start + 1;
    const heapSize = n;
    for (let i = Math.floor(n/2); i > 0; i--) {
        maxHeapify(array, start, end, i, heapSize);
    }
}

// Ensures that all elements related to index i satisfy the conditions of a heap.
function maxHeapify(array, start, end, i, heapSize) {
    var offset = start - 1;

    // If this element has no children
    if (2 * i >= heapSize) return;

    // Find the children of this element
    let leftChild = 2 * i;
    // rightChild = leftChild if this element only has one child
    let rightChild = (2 * i + 1 < heapSize) ? 2 * i + 1 : leftChild;

    // Find the largest element between the parent, left and right children.
    addToHistory({array: array.slice(), highlights: [i + offset, leftChild + offset, rightChild + offset]});
    let largest = i;
    if (array[leftChild + offset] > array[i + offset]) {
        largest = leftChild;
    }
    if (array[rightChild + offset] > array[largest + offset]) {
        largest = rightChild;
    }

    // Swap elements if a child is bigger than the parent
    if (largest !== i) {
        swap(array, i + offset, largest + offset);
        addToHistory({array: array.slice(), highlights: [i + offset, largest + offset]});
        // Heapify again for the child's children
        maxHeapify(array, start, end, largest, heapSize);
    }
}




// ------------------------------------- Insertion Sort ------------------------------------- //

// insertion sort from start (inclusive) to end (exclusive)
function insertionSort(array, start, end) {
    if (end <= start) return array;

    // Sort the section using insertion method
    for (let i = start+1; i < end; i++) {
        let j = i;
        addToHistory({array: array.slice(), highlights: [j-1, j]});
        while (j > start && array[j] < array[j-1]) {
            swap(array, j-1, j);
            addToHistory({array: array.slice(), highlights: [j-1, j]});
            j--;
        }
    }
    return array;
}



// ------------------------------------- Partition ------------------------------------- //

// Partition the range so that the left side is smaller than the pivot and the right side is 
// larger than the pivot.
function partition(array, start, end) {
    if (end - start <= 1) return start;

    // Pick the pivot
    const pivot = array[start];
    let i = start + 1;
    let j = end - 1;
    while (true) {
        // Find an element that is smaller than/equal to the pivot
        while (array[i] <= pivot && i < j) {
            addToHistory({array: array.slice(), highlights: [start, i, j]});
            i += 1;
        }
        // Find an element that is larger than the pivot
        while (array[j] > pivot && i <= j) {
            addToHistory({array: array.slice(), highlights: [start, i, j]});
            j -= 1;
        }
        // Swap the 2 elements only if i is still to the left of j
        if (i < j) {
            addToHistory({array: array.slice(), highlights: [start, i, j]});
            swap(array, i, j);
            addToHistory({array: array.slice(), highlights: [start, i, j]});
        } else {
            break;
        }
    }
    
    // Swap pivot into position
    addToHistory({array: array.slice(), highlights: [start, j]});
    swap(array, start, j)
    addToHistory({array: array.slice(), highlights: [start, j]});
    
    let pivotIndex = j;
    return pivotIndex;
}
