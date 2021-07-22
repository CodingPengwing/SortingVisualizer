import { swap } from "./util";

var addToHistory;

export function sort(props) {
    addToHistory = props.addToHistory;
    // Do the sorting
    const sortedArray = gnomeSort(props.array);
    // Finish the history by adding the final sorted array.
    addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

function gnomeSort(array) {
    if (array.length <= 1) return array;
    let i = 1;
    // Iterate from start to end, if elements are out of order, swap and go back one step.
    // Otherwise go forward one step. By the end of this, the array must be sorted.
    while (i < array.length) {
        addToHistory({array: array.slice(), highlights: [i-1, i]});
        // If elements are in order, go forward.
        if (array[i-1] <= array[i]) { i++; }
        // Else swap them and take a step back.
        else {
            swap(array, i-1, i);
            addToHistory({array: array.slice(), highlights: [i-1, i]});
            if (i > 1) { i--; }
        }
    }
    return array;
}
