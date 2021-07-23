// About half of the code in this file was borrowed from
// https://www.geeksforgeeks.org/timsort/

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
    // Do the sorting
    const sortedArray = timSort(props.array);
    return sortedArray;
}

const MIN_MERGE = 16;

function timSort(array) {
    let n = array.length;
    // Find the minimum run optimal for merging
    const minRun = calculateMinRun(n);

    // Use insertion sort to sort each sequential run in the array.
    for (let start = 0; start < n; start += minRun) {
        const end = Math.min(start + minRun, n);
        insertionSort(array, start, end);
        // Show the section that has just been sorted
        locallySorted.push(...range(start, end));
        addStateToHistory(array, [], locallySorted, []);
    }

    let size = minRun;
    while (size <= n) {
        for (let start = 0; start < n; start += 2 * size) {
            // Split the current sort range
            const split = start + size;
            const end = Math.min(start + 2 * size, n);
            if (split < end) {
                // Merge the left and right arrays if adjacent elements are 
                // out of order, otherwise, they're already sorted.
                if (array[split-1] >= array[split]) {
                    merge(array, start, split, end);
                }
            }
        }
        size *= 2;
    }

    // Here the entire array is sorted.
    addStateToHistory(array, [], [], range(0, array.length));
    return array;
}

// Find the minimum run length that's optimal for merging
function calculateMinRun(n) {
    let r = 0;
    while (n >= MIN_MERGE) {
        r |= (n & 1);
        n >>= 1;
    }
    return n + r;
}

// Standard insertion sort
function insertionSort(array, start, end) {
    if (end - start <= 1) return array;
    // Sort the section using insertion method
    for (let i = start + 1; i < end; i++) {
        let j = i;
        comparing = [j-1, j];
        addStateToHistory(array, comparing, locallySorted, []);
        while (j > start && array[j] < array[j-1]) {
            swap(array, j-1, j);
            comparing = [j-1, j]
            addStateToHistory(array, comparing, locallySorted, []);
            j--;
        }
        if (i === start + 1) { locallySorted.push(start); }
        locallySorted.push(i);
    }
    comparing = [];
    addStateToHistory(array, comparing, locallySorted, []);
    return array;
}

// Standard merge function
function merge(array, start, split, end) {
    if (end - start <= 1) return array;

    let mergeArray = [];
    let i = start, j = split;
    while (i < split && j < end) {
        comparing = [i, j];
        addStateToHistory(array, comparing, locallySorted, []);
        if (array[i] <= array[j]) {
            mergeArray.push(array[i++]);
        } else {
            mergeArray.push(array[j++]);
        }
    }

    while (i < split) {
        comparing = [i, j-1];
        addStateToHistory(array, comparing, locallySorted, []);
        mergeArray.push(array[i++]);
    }
    while (j < end) {
        comparing = [i-1, j];
        addStateToHistory(array, comparing, locallySorted, []);
        mergeArray.push(array[j++]);
    }

    // Determine if this is the very last merge operation to sort the array
    let lastMerge = false;
    if (end - start === array.length) {
        lastMerge = true;
    }

    // Write the sorted elements back into the original array
    for (let k = 0; k < mergeArray.length; k++) {
        array[start+k] = mergeArray[k];
        if (lastMerge) { globallySorted.push(start+k); }
        comparing = [start+k];
        addStateToHistory(array, comparing, locallySorted, globallySorted);
    }

    return array;
}