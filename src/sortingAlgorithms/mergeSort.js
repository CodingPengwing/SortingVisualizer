import { range } from '../sortingAlgorithms/util';

export function sort(props) {
    const start = 0;
    const end = props.array.length-1;
    let sortedArray = mergeSort(props.array, start, end, props.addToHistory);
    props.addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

// start is the starting index of the array
// end is the last index of the array (inclusive)
function mergeSort(array, start, end, addToHistory) {
    if (end <= start) return array;

    // Split down the middle and recurse left, right
    const len = end-start+1;
    const splitIdx = Math.ceil(start + len/2);
    mergeSort(array, start, splitIdx-1, addToHistory);
    mergeSort(array, splitIdx, end, addToHistory);

    // Show the current section that's being sorted
    addToHistory({array: array.slice(), highlights: range(start, end+1)});
    merge(array, start, splitIdx, end, addToHistory);
    return array;
}

function merge(array, start, splitIdx, end, addToHistory) {
    let mergeArray = [];
    let i = start, j = splitIdx;
    while (i < splitIdx && j < end + 1) {
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
    while (j < end + 1) {
        addToHistory({array: array.slice(), highlights: [i-1, j]});
        mergeArray.push(array[j++]);
    }

    for (let i = 0; i < mergeArray.length; i++) {
        addToHistory({array: array.slice(), highlights: [start+i]});
        array[start+i] = mergeArray[i];
    }
}
