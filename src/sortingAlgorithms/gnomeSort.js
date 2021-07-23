import { range, swap } from "./util";

var addStateToHistory;
var locallySorted;
var comparing;

export function sort(props) {
    locallySorted = [];
    comparing = [];
    addStateToHistory = props.addStateToHistory;
    // Do the sorting
    const sortedArray = gnomeSort(props.array);
    return sortedArray;
}

function gnomeSort(array) {
    if (array.length <= 1) return array;
    let i = 0;
    // Iterate from start to end, if elements are out of order, swap and go back one step.
    // Otherwise go forward one step. By the end of this, the array must be sorted.
    while (i < array.length - 1) {
        comparing = [i, i+1];
        addStateToHistory(array, comparing, locallySorted, []);
        // If elements are in order, go forward.
        if (array[i] <= array[i+1]) { 
            if (i === 0) { locallySorted.push(i); }
            i++; 
            locallySorted.push(i);
        }
        // Else swap them and take a step back.
        else {
            swap(array, i, i+1);
            addStateToHistory(array, comparing, locallySorted, []);
            if (i > 0) { i--; }
        }
    }
    // Here the entire array is sorted.
    addStateToHistory(array, [], [], range(0, array.length));
    return array;
}
