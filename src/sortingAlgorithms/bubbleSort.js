import { swap } from './util';

var addToHistory;

export function sort(props) {
    addToHistory = props.addToHistory;
    // Do the sorting
    const sortedArray = bubbleSort(props.array);
    // Finish the history by adding the final sorted array.
    addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

function bubbleSort(array) {
    if (array.length <= 1) return array;
    let sorted = false;
    // While the array is not sorted, iterate from start to finish and swap adjacent elements that are out of order.
    while (!sorted) {
        sorted = true;
        for (let i = 1; i < array.length; i++) {
            addToHistory({array: array.slice(), highlights: [i-1, i]});
            if (array[i-1] > array[i]) {
                swap(array, i-1, i);
                addToHistory({array: array.slice(), highlights: [i-1, i]});
                sorted = false;
            }
        }
    }
    return array;
}
