import { range } from './util';

var addToHistory;

export function sort(props) {
    addToHistory = props.addToHistory;
    const start = 0;
    const end = props.array.length-1;
    let sortedArray = mergeSort(props.array, start, end);
    addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

// start is the starting index of the array
// end is the last index of the array (inclusive)
function mergeSort(array, start, end) {
    if (end <= start) return array;

    // Split down the middle and recurse left, right
    const len = end-start+1;
    const splitIdx = Math.ceil(start + len/2);

    mergeSort(array, start, splitIdx-1);
    mergeSort(array, splitIdx, end);

    // Only merge the left and right arrays if elements are out of order.
    if (array[splitIdx-1] >= array[splitIdx]) {
        merge(array, start, splitIdx, end);
    }

    addToHistory({array: array.slice(), highlights: range(start, end+1)});
    return array;
}

function merge(array, start, splitIdx, end) {
    if (end <= start) return array;
    
    let mergeArray = [];
    let i = start, j = splitIdx;
    while (i < splitIdx && j <= end) {
        addToHistory({array: array.slice(), highlights: [i, j]});
        if (array[i] <= array[j]) {
            mergeArray.push(array[i++]);
        } else {
            mergeArray.push(array[j++]);
        }
    }
    while (i < splitIdx) {
        addToHistory({array: array.slice(), highlights: [i, j-1]});
        mergeArray.push(array[i++]);
    }
    while (j <= end) {
        addToHistory({array: array.slice(), highlights: [i-1, j]});
        mergeArray.push(array[j++]);
    }

    for (let k = 0; k < mergeArray.length; k++) {
        addToHistory({array: array.slice(), highlights: [start+k]});
        array[start+k] = mergeArray[k];
    }

    return array;
}
