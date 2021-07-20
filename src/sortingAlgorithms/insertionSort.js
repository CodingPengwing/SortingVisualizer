import { swap } from "./util";

var addToHistory;

export function sort(props) {
    addToHistory = props.addToHistory;
    const sortedArray = insertionSort(props.array);
    addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

function insertionSort(array) {
    if (array.length <= 1) return array;
    for (let i = 1; i < array.length; i++) {
        let j = i - 1;
        addToHistory({array: array.slice(), highlights: [j, i]});
        while (j >= 0 && array[j] > array[j+1]) {
            swap(array, j, j+1);
            addToHistory({array: array.slice(), highlights: [j, j+1]});
            j -= 1;
        }
    }
    return array;
}
