// Optimizing using 3-way principle
// https://www.techiedelight.com/quicksort-using-dutch-national-flag-algorithm/
// https://www.geeksforgeeks.org/3-way-quicksort-dutch-national-flag/

// Optimizing using tail call
// https://www.geeksforgeeks.org/quicksort-tail-call-optimization-reducing-worst-case-space-log-n/

import { range, randomIntFromInterval, swap } from './util';

var addToHistory;

export function sort(props) {
    addToHistory = props.addToHistory;
    const array = props.array;
    const start = 0;
    const end = array.length-1;
    // Do the sorting
    const sortedArray = quickSort(array, start, end);
    // Finish the history by adding the final sorted array.
    addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

function quickSort(array, start, end) {
    // Loop for tail call optimization.
    // While the end is bigger than start, array is still not sorted
    while (start < end) {
        const [pivotLeft, pivotRight] = partition(array, start, end);
        // Pick the smaller partition to recurse into.
        // If the left partition is smaller than the right partition recurse there
        if (pivotLeft - start < end - pivotRight) {
            quickSort(array, start, pivotLeft-1);
            start = pivotRight + 1;
        }
        // If the right partition is smaller, recurse there
        else {
            quickSort(array, pivotRight+1, end);
            end = pivotLeft - 1;
        }
    }
    return array;
}

function partition(array, start, end) {
    if (end <= start) return [start, end];

    //  If this section has more than 5 elements
    if (end - start + 1 > 5) {
        // Choose pivot at random to reduce chance of O(n^2) worst case.
        let pivotIndex = randomIntFromInterval(start, end);
        addToHistory({array: array.slice(), highlights: [start, pivotIndex]});
        swap(array, start, pivotIndex);
        addToHistory({array: array.slice(), highlights: [start, pivotIndex]});
    }

    let mid = start + 1;
    let pivot = array[start];

    // mid holds the left of the pivot range, the pivot range is the range of elements
    // that are equal to the pivot
    while (mid <= end) {
        addToHistory({array: array.slice(), highlights: [start, mid, end]});
        if (array[mid] < pivot) {
            swap(array, start, mid);
            addToHistory({array: array.slice(), highlights: [start, mid]});
            start++;
            mid++;
        } 
        else if (array[mid] > pivot) {
            swap(array, mid, end);
            addToHistory({array: array.slice(), highlights: [start, mid, end]});
            end--;
        } 
        else {
            mid++;
        }
    }
    // start is now our left pivot position (inclusive)
    // end is now our right pivot position (inclusive)
    // this means that everything within the pivotRange is equal to our pivot
    if (end - start >= 1) {
        let pivotRange = range(start, end+1);
        addToHistory({array: array.slice(), highlights: pivotRange.slice()});
    }
    return [start, end];
}
