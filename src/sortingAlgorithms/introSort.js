// About half of this code was borrowed from
// https://www.geeksforgeeks.org/introsort-or-introspective-sort/

import { range, swap } from "./util";

var takeSnapshot;
var globallySorted;
var locallySorted;
var comparing;

export function sort(props) {
    globallySorted = [];
    locallySorted = [];
    comparing = [];
    takeSnapshot = props.takeSnapshot;
    const start = 0;
    const end = props.array.length;
    // Initialize the depthLimit as log(length(data))
    const depthLimit = Math.floor(Math.log2(end - start));
    // Do the sorting
    const sortedArray = introSort(props.array, start, end, depthLimit);
    return sortedArray;
}

// Intro sort from start (inclusive) to end (exclusive)
function introSort(array, start, end, depthLimit) {
    if (end - start <= 1) { 
        globallySorted.push(start);
        takeSnapshot(array, [], [], globallySorted);
        return array; 
    }
    const n = end - start;
    // If the array is smaller than 10, sort with insertion sort
    if (n < 10) {
        insertionSort(array, start, end);
        return array;
    }
    // If we have reached max recursion depth, use heap sort
    if (depthLimit === 0) {
        heapSort(array, start, end);
        return array;
    }
    // Otherwise partition the array and go ahead
    const p = partition(array, start, end);
    if (p !== start && p !== end) {
        globallySorted.push(p);
        takeSnapshot(array, [], [], globallySorted);
    }

    introSort(array, start, p, depthLimit-1);
    introSort(array, p+1, end, depthLimit-1);

    locallySorted = [];
    return array;
}


// ------------------------------------- Heap Sort ------------------------------------- //

// Function to sort an array from start (inclusive) to end (exclusive).
function heapSort(array, start, end) {
    if (end - start <= 1) { return array; }

    bottomUpHeapify(array, start, end);
    let heapSize;
    let i;
    for (i = end - 1; i > start; i--) {
        comparing = [start, i];
        takeSnapshot(array, comparing, locallySorted, globallySorted);
        swap(array, start, i);
        takeSnapshot(array, comparing, locallySorted, globallySorted);
        locallySorted.push(i);
        heapSize = i - start;
        maxHeapify(array, start, end, start, heapSize);
    }
    comparing = [];
    locallySorted.push(i);
    takeSnapshot(array, comparing, locallySorted, globallySorted);
    locallySorted = [];
    globallySorted.push(...range(start, end));
    takeSnapshot(array, comparing, locallySorted, globallySorted);
    return array;
}

// Turns the entire array into a heap
function bottomUpHeapify(array, start, end) {
    const n = end - start;
    for (let i = start + Math.floor(n/2) - 1; i >= start; i--) {
        maxHeapify(array, start, end, i, n);
    }
}

// Ensures that all elements related to index i satisfy the conditions of a heap.
function maxHeapify(array, start, end, i, heapSize) {
    var offset = start;
    // Find the children of this element
    let lChild = 2 * (i - offset) + offset + 1;
    let rChild = 2 * (i - offset) + offset + 2;
    if (lChild >= start + heapSize) {
        return array;
    }
    if (rChild >= start + heapSize) {
        rChild = lChild;
    }

    // Find the largest element between the parent, left and right children.
    comparing = [i, lChild, rChild];
    takeSnapshot(array, comparing, locallySorted, globallySorted);
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
        takeSnapshot(array, comparing, locallySorted, globallySorted);
        // Heapify again for the child's children
        maxHeapify(array, start, end, largest, heapSize);
    }
}




// ------------------------------------- Insertion Sort ------------------------------------- //

// Insertion sort from start (inclusive) to end (exclusive)
function insertionSort(array, start, end) {
    if (end - start <= 1) { return array; }

    // Sort the section using insertion method
    for (let i = start + 1; i < end; i++) {
        let j = i;
        comparing = [j-1, j];
        takeSnapshot(array, comparing, locallySorted, globallySorted);
        while (j > start && array[j] < array[j-1]) {
            swap(array, j-1, j);
            comparing = [j-1, j];
            takeSnapshot(array, comparing, locallySorted, globallySorted);
            j--;
        }
        if (i === start + 1) { locallySorted.push(start); }
        locallySorted.push(i);
    }
    comparing = [];
    takeSnapshot(array, comparing, locallySorted, globallySorted);
    locallySorted = [];
    globallySorted.push(...range(start, end));
    takeSnapshot(array, comparing, locallySorted, globallySorted);
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
            comparing = [start, i, j];
            takeSnapshot(array, comparing, [], globallySorted);
            i += 1;
        }
        // Find an element that is larger than the pivot
        while (array[j] > pivot && i <= j) {
            comparing = [start, i, j];
            takeSnapshot(array, comparing, [], globallySorted);
            j -= 1;
        }
        // Swap the 2 elements only if i is still to the left of j
        if (i < j) {
            comparing = [start, i, j];
            takeSnapshot(array, comparing, [], globallySorted);
            swap(array, i, j);
            takeSnapshot(array, comparing, [], globallySorted);
        } else {
            break;
        }
    }
    
    // Swap pivot into position
    comparing = [start, j];
    takeSnapshot(array, comparing, [], globallySorted);
    swap(array, start, j)
    takeSnapshot(array, comparing, [], globallySorted);
    return j;
}
