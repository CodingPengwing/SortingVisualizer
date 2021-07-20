import { swap } from './util';

var addToHistory;

export function sort(props) {
    addToHistory = props.addToHistory;
    const sortedArray = bubbleSort(props.array);
    addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

function bubbleSort(array) {
    if (array.length <= 1) return array;
    let sorted = false;
    while (!sorted) {
        sorted = true;
        for (let i=1; i<array.length; i++) {
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