import { swap } from "./util";

var addToHistory;

export function sort(props) {
    addToHistory = props.addToHistory;
    const start = 0;
    const end = props.array.length-1;
    const sortedArray = quickSort(props.array, start, end);
    addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

function quickSort(array, start, end) {
    if (end <= start) return array;
    const p = partition(array, start, end);
    quickSort(array, start, p-1);
    quickSort(array, p+1, end);
    return array;
}

function partition(array, start, end) {
    if (end <= start) return start;

    const pivot = array[start];
    let i = start + 1;
    let j = end;
    while (true) {
        while (array[i] <= pivot && i < j) {
            addToHistory({array: array.slice(), highlights: [start, i, j]});
            i += 1;
        }
        while (array[j] > pivot && i <= j) {
            addToHistory({array: array.slice(), highlights: [start, i, j]});
            j -= 1;
        }
        if (i < j) {
            addToHistory({array: array.slice(), highlights: [start, i, j]});
            swap(array, i, j);
            addToHistory({array: array.slice(), highlights: [start, i, j]});
        } else {
            break;
        }
    }
    
    // Swap pivot into position
    addToHistory({array: array.slice(), highlights: [start, j]});
    swap(array, start, j)
    addToHistory({array: array.slice(), highlights: [start, j]});
    
    let pivotIndex = j;
    return pivotIndex;
}
