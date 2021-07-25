// About half of the code in this file was borrowed from
// https://www.geeksforgeeks.org/timsort/

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
    }

    let size = minRun;
    while (size <= n) {
        for (let start = 0; start < n; start += 2 * size) {
            // Split the current sort range
            const split = start + size;
            const end = Math.min(start + 2 * size, n);
            
            // if split < end we need to merge the 2 partitions (else, we only have 1 partition)
            if (split < end) {
                // If this section has been locally sorted before, it's no longer locally sorted because
                // we need to merge it again.
                if (locallySorted.includes(start)) {
                    for (let i = 0; i < locallySorted.length; i++) {
                        if (start <= locallySorted[i] && locallySorted[i] < end) {
                            locallySorted[i] = -1;
                        }
                    }
                    comparing = [];
                    takeSnapshot(array, comparing, locallySorted, globallySorted);
                }
                
                // Merge the left and right arrays if adjacent elements are 
                // out of order, otherwise, they're already sorted.
                if (array[split-1] > array[split]) {
                    merge(array, start, split, end);
                } else {
                    comparing = range(start, end);
                    takeSnapshot(array, comparing, locallySorted, []);
                    comparing = [];
                    locallySorted.push(...range(start, end));
                    takeSnapshot(array, comparing, locallySorted, []);
                }
            } 
        }
        size *= 2;
    }

    // Here the entire array is sorted.
    takeSnapshot(array, [], [], range(0, array.length));
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
        takeSnapshot(array, comparing, locallySorted, []);
        while (j > start && array[j] < array[j-1]) {
            swap(array, j-1, j);
            comparing = [j-1, j]
            takeSnapshot(array, comparing, locallySorted, []);
            j--;
        }
        if (i === start + 1) { locallySorted.push(start); }
        locallySorted.push(i);
    }
    comparing = [];
    takeSnapshot(array, comparing, locallySorted, []);
    return array;
}

// Standard merge function
function merge(array, start, split, end) {
    if (end - start <= 1) return array;

    let mergeArray = [];
    let i = start, j = split;
    while (i < split && j < end) {
        comparing = [i, j];
        takeSnapshot(array, comparing, locallySorted, []);
        if (array[i] <= array[j]) {
            mergeArray.push(array[i++]);
        } else {
            mergeArray.push(array[j++]);
        }
    }

    while (i < split) {
        comparing = [i];
        takeSnapshot(array, comparing, locallySorted, []);
        mergeArray.push(array[i++]);
    }
    while (j < end) {
        comparing = [j];
        takeSnapshot(array, comparing, locallySorted, []);
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
        locallySorted.push(start+k);
        if (lastMerge) { globallySorted.push(start+k); }
        comparing = [start+k];
        takeSnapshot(array, comparing, locallySorted, globallySorted);
    }

    comparing = [];
    takeSnapshot(array, comparing, locallySorted, globallySorted);
    return array;
}
