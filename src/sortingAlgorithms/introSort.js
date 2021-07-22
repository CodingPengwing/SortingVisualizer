import { range, swap } from "./util";

var addStateToHistory;
var globallySorted;
var locallySorted;
var comparing;

export function sort(props) {
    globallySorted = [];
    locallySorted = [];
    comparing = [];
    addStateToHistory = props.addStateToHistory;
    const start = 0;
    const end = props.array.length;
    // Initialize the depthLimit as log(length(data))
    const depthLimit = Math.floor(Math.log2(end - start));
    // Do the sorting
    const sortedArray = introSort(props.array, start, end, depthLimit);
    // Finish the history by adding the final sorted array.
    addStateToHistory(sortedArray, [], [], []);
    return sortedArray;
}

// Intro sort from start (inclusive) to end (exclusive)
function introSort(array, start, end, depthLimit) {
    const n = end - start;
    // If the array is smaller than 16, sort with insertion sort
    if (n < 16) {
        return insertionSort(array, start, end);
    }
    // If we have reached max recursion depth, use heap sort
    if (depthLimit === 0) {
        return heapSort(array, start, end);
    }
    // Otherwise partition the array and go ahead
    const p = partition(array, start, end);
    globallySorted.push(p);
    introSort(array, start, p, depthLimit-1);
    introSort(array, p+1, end, depthLimit-1);

    return array;
}


// ------------------------------------- Heap Sort ------------------------------------- //

// Function to sort an array from start (inclusive) to end (exclusive).
function heapSort(array, start, end) {
    if (end - start <= 1) return array;

    bottomUpHeapify(array, start, end);
    let n = end - start;
    for (let i = start + n - 1; i > start; i--) {
        comparing = [start, i];
        addStateToHistory(array, comparing, [], globallySorted);
        swap(array, start, i);
        globallySorted.push(i);
        addStateToHistory(array, comparing, [], globallySorted);
        maxHeapify(array, start, end, start, i - start);
    }
    globallySorted.push(...range(start, end));
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

    // Find the largest element between the parent, left and right children.
    comparing = [i, lChild, rChild];
    addStateToHistory(array, comparing, [], globallySorted);
    let largest = i;
    if (lChild < start + heapSize && array[lChild] > array[largest]) {
        largest = lChild;
    }
    if (rChild < start + heapSize && array[rChild] > array[largest]) {
        largest = rChild;
    }

    // Swap elements if a child is bigger than the parent
    if (largest !== i) {
        swap(array, i, largest);
        comparing = [i, largest];
        addStateToHistory(array, comparing, [], globallySorted);
        // Heapify again for the child's children
        maxHeapify(array, start, end, largest, heapSize);
    }
}




// ------------------------------------- Insertion Sort ------------------------------------- //

// Insertion sort from start (inclusive) to end (exclusive)
function insertionSort(array, start, end) {
    if (end - start <= 1) return array;

    // Sort the section using insertion method
    for (let i = start; i < end; i++) {
        let j = i;
        comparing = [i, j];
        addStateToHistory(array, comparing, locallySorted, globallySorted);
        while (j > start && array[j] < array[j-1]) {
            swap(array, j-1, j);
            comparing = [j-1, j]
            addStateToHistory(array, comparing, locallySorted, globallySorted);
            j--;
        }
        locallySorted.push(i);
    }
    locallySorted = [];
    globallySorted.push(...range(start, end));
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
            comparing = [i, j];
            addStateToHistory(array, comparing, [], globallySorted);
            i += 1;
        }
        // Find an element that is larger than the pivot
        while (array[j] > pivot && i <= j) {
            comparing = [i, j];
            addStateToHistory(array, comparing, [], globallySorted);
            j -= 1;
        }
        // Swap the 2 elements only if i is still to the left of j
        if (i < j) {
            comparing = [i, j];
            addStateToHistory(array, comparing, [], globallySorted);
            swap(array, i, j);
            addStateToHistory(array, comparing, [], globallySorted);
        } else {
            break;
        }
    }
    
    // Swap pivot into position
    comparing = [start, j];
    addStateToHistory(array, comparing, [], globallySorted);
    swap(array, start, j)
    addStateToHistory(array, comparing, [], globallySorted);
    
    return j;
}
