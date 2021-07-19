// Optimizing using 3-way principle
// https://www.techiedelight.com/quicksort-using-dutch-national-flag-algorithm/
// https://www.geeksforgeeks.org/3-way-quicksort-dutch-national-flag/

// Optimizing using tail call
// https://www.geeksforgeeks.org/quicksort-tail-call-optimization-reducing-worst-case-space-log-n/

import { range, randomIntFromInterval } from '../sortingAlgorithms/util';

export function sort(props) {
    const array = props.array;
    const start = 0;
    const end = array.length-1;
    const sortedArray = quickSort(array, start, end, props.addToHistory);
    props.addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

function quickSort(array, start, end, addToHistory) {
    // Loop for tail call optimization.
    while (start < end) {
        const [pivotLeft, pivotRight] = partition(array, start, end, addToHistory);
        if (pivotLeft - start < end - pivotRight) {
            quickSort(array, start, pivotLeft-1, addToHistory);
            start = pivotRight + 1;
        }
        else {
            quickSort(array, pivotRight+1, end, addToHistory);
            end = pivotLeft - 1;
        }
    }
    return array;
}

function partition(array, start, end, addToHistory) {
    if (end <= start) return [start, end];

    //  If this section has more than 5 elements
    if (end - start + 1 > 5) {
        // Choose pivot at random to reduce chance of O(n^2) worst case.
        let pivotIndex = randomIntFromInterval(start, end);
        addToHistory({array: array.slice(), highlights: [start, pivotIndex]});
        [array[start], array[pivotIndex]] = [array[pivotIndex], array[start]];
        addToHistory({array: array.slice(), highlights: [start, pivotIndex]});
    }

    let mid = start + 1;
    let pivot = array[start];

    while (mid <= end) {
        addToHistory({array: array.slice(), highlights: [start, mid, end]});
        if (array[mid] < pivot) {
            [array[start], array[mid]] = [array[mid], array[start]];
            addToHistory({array: array.slice(), highlights: [start, mid]});
            start++;
            mid++;
        } 
        else if (array[mid] > pivot) {
            [array[mid], array[end]] = [array[end], array[mid]];
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
    let pivotRange = range(start, end+1);
    addToHistory({array: array.slice(), highlights: pivotRange.slice()});
    return [start, end];
}
