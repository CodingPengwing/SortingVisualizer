import { swap } from "./util";

var addStateToHistory;
var locallySorted;
var comparing;

export function sort(props) {
    locallySorted = [];
    comparing = [];
    addStateToHistory = props.addStateToHistory;
    // Do the sorting
    const sortedArray = insertionSort(props.array);
    // Finish the history by adding the final sorted array.
    addStateToHistory(sortedArray, [], [], []);
    return sortedArray;
}

function insertionSort(array) {
    if (array.length <= 1) return array;
    // Iterate from start to end of the array, for each element, check whether they are larger than 
    // all previous elements. If yes, continue. Otherwise, go backwards and find the correct place for 
    // this element.
    for (let i = 0; i < array.length; i++) {
        let j = i;
        comparing = [i, j];
        addStateToHistory(array, comparing, locallySorted, []);
        // This while loop moves backwards if the element is out of order.
        while (j > 0 && array[j-1] > array[j]) {
            swap(array, j-1, j);
            comparing = [j-1, j]
            addStateToHistory(array, comparing, locallySorted, []);
            j--;
        }
        locallySorted.push(i);
    }
    return array;
}
