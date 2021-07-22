import { swap } from "./util";

var addToHistory;

export function sort(props) {
    addToHistory = props.addToHistory;
    // Do the sorting
    const sortedArray = insertionSort(props.array);
    // Finish the history by adding the final sorted array.
    addToHistory({array: sortedArray, highlights: []});
    return sortedArray;
}

function insertionSort(array) {
    if (array.length <= 1) return array;
    // Iterate from start to end of the array, for each element, check whether they are larger than 
    // all previous elements. If yes, continue. Otherwise, go backwards and find the correct place for 
    // this element.
    for (let i = 1; i < array.length; i++) {
        let j = i;
        addToHistory({array: array, highlights: [j, i]});
        // This while loop moves backwards if the element is out of order.
        while (j > 0 && array[j-1] > array[j]) {
            swap(array, j-1, j);
            addToHistory({array: array, highlights: [j-1, j]});
            j--;
        }
    }
    return array;
}
