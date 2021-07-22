import { swap } from './util';

var addToHistory;

export function sort(props) {
    addToHistory = props.addToHistory;
    // Do the sorting
    const sortedArray = bubbleSort(props.array);
    // Finish the history by adding the final sorted array.
    addToHistory({array: sortedArray, highlights: []});
    return sortedArray;
}

function bubbleSort(array) {
    if (array.length <= 1) return array;
    // upperLimit is the start index of the section that is sorted
    var upperLimit = array.length;
    let sorted = false;
    // While the array is not sorted, iterate from start to finish and swap adjacent elements that are out of order.
    while (!sorted) {
        sorted = true;
        for (let i = 1; i < upperLimit; i++) {
            addToHistory({array: array, highlights: [i-1, i]});
            if (array[i-1] > array[i]) {
                swap(array, i-1, i);
                addToHistory({array: array, highlights: [i-1, i]});
                sorted = false;
            }
        }
        upperLimit--;
    }
    return array;
}
