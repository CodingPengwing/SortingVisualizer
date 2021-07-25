import { range, swap } from "./util";

var takeSnapshot;
var locallySorted;
var comparing;

export function sort(props) {
    locallySorted = [];
    comparing = [];
    takeSnapshot = props.takeSnapshot;
    // Do the sorting
    const sortedArray = gnomeSort(props.array);
    return sortedArray;
}

function gnomeSort(array) {
    if (array.length <= 1) return array;
    locallySorted.push(0);
    let i = 1;
    // Iterate from start to end, if elements are out of order, swap and go back one step.
    // Otherwise go forward one step. By the end of this, the array must be sorted.
    while (i < array.length) {
        comparing = [i-1, i];
        takeSnapshot(array, comparing, locallySorted, []);
        locallySorted.push(i);
        // If elements are in order, go forward.
        if (array[i-1] <= array[i]) { 
            i++; 
        }
        // Else swap them and take a step back.
        else {
            swap(array, i-1, i);
            takeSnapshot(array, comparing, locallySorted, []);
            if (i > 1) { i--; } else { i++; }
        }
    }
    // Here the entire array is sorted.
    takeSnapshot(array, [], [], range(0, array.length));
    return array;
}
