// Optimizing using 3-way principle
// https://www.techiedelight.com/quicksort-using-dutch-national-flag-algorithm/
// https://www.geeksforgeeks.org/3-way-quicksort-dutch-national-flag/

// Optimizing using tail call
// https://www.geeksforgeeks.org/quicksort-tail-call-optimization-reducing-worst-case-space-log-n/

import { range, randomIntFromInterval, swap } from './util';

var takeSnapshot;
var globallySorted;
var locallySorted;
var comparing;

export function sort(props) {
    globallySorted = [];
    locallySorted = [];
    comparing = [];
    takeSnapshot = props.takeSnapshot;
    const array = props.array;
    const start = 0;
    const end = array.length;
    // Do the sorting
    const sortedArray = quickSort(array, start, end);
    return sortedArray;
}

// Sort array from start (inclusive) to end (exclusive)
function quickSort(array, start, end) {
    // While loop used for tail call optimization.
    // While the end is bigger than start, array is still not sorted
    while (start < end) {
        const [pivotLeft, pivotRight] = partition(array, start, end);
        globallySorted.push(...range(pivotLeft, pivotRight));
        takeSnapshot(array, [], [], globallySorted);
        // Pick the smaller partition to recurse into.
        // If the left partition is smaller than the right partition recurse there
        if (pivotLeft - start < end - pivotRight) {
            quickSort(array, start, pivotLeft);
            // start -> pivotRight is now sorted
            // move start to pivotRight
            start = pivotRight;
        }
        // If the right partition is smaller, recurse there
        else {
            quickSort(array, pivotRight, end);
            // pivotLeft -> end is now sorted
            // move end to pivotLeft
            end = pivotLeft;
        }
    }

    // globallySorted.push(...range(start, end));
    // takeSnapshot(array, [], [], globallySorted);
    return array;
}

function partition(array, start, end) {
    if (end - start <= 1) { return [start, end]; }

    //  If this section has more than 5 elements
    if (end - start > 5) {
        // Choose pivot at random to reduce chance of O(n^2) worst case.
        let p = randomIntFromInterval(start, end-1);
        comparing = [start, p];
        takeSnapshot(array, comparing, [], globallySorted);
        swap(array, start, p);
        takeSnapshot(array, comparing, [], globallySorted);
    }

    let pivot = array[start];
    let mid = start + 1;

    // start is the left of our pivot range
    // mid is the right of our pivot range
    while (mid < end) {
        if (mid - start > 1) {
            locallySorted = range(start, mid);
        }
        comparing = [start, mid, end-1];
        takeSnapshot(array, comparing, locallySorted, globallySorted);
        if (array[mid] === pivot) {
            mid++;
        } else if (array[mid] < pivot) {
            swap(array, start, mid);
            takeSnapshot(array, comparing, locallySorted, globallySorted);
            start++;
            mid++;
        } else if (array[mid] > pivot) {
            swap(array, mid, end-1);
            takeSnapshot(array, comparing, locallySorted, globallySorted);
            end--;
        } 
    }
    // start is now our left pivot position (inclusive)
    // end is now our right pivot position (exclusive)
    // this means that everything within this range is equal to our pivot
    return [start, end];
}
