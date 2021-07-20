import { swap } from "./util";

var addToHistory;

export function sort(props) {
    addToHistory = props.addToHistory;
    const sortedArray = gnomeSort(props.array);
    addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

function gnomeSort(array) {
    if (array.length <= 1) return array;
    let i = 1;
    while (i < array.length) {
        addToHistory({array: array.slice(), highlights: [i-1, i]});
        if (array[i-1] <= array[i]) { i++; }
        else {
            swap(array, i-1, i);
            addToHistory({array: array.slice(), highlights: [i-1, i]});
            if (i > 1) { i--; }
        }
    }
    return array;
}
