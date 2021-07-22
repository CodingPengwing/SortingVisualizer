import { range } from './util';

var addToHistory;

export function sort(props) {
    addToHistory = props.addToHistory;
    const start = 0;
    const end = props.array.length-1;
    // Do the sorting
    let sortedArray = mergeSort(props.array, start, end);
    // Finish the history by adding the final sorted array.
    addToHistory({array: sortedArray, highlights: []});
    return sortedArray;
}

// start is the starting index of the array
// end is the last index of the array (inclusive)
function mergeSort(array, start, end) {
    if (end <= start) return array;

    // Split down the middle and recurse left, right
    const len = end-start+1;
    const split = Math.ceil(start + len/2);
    mergeSort(array, start, split-1);
    mergeSort(array, split, end);

    // Only merge the left and right arrays if elements are out of order.
    if (array[split-1] >= array[split]) {
        merge(array, start, split, end);
    }
 
    addToHistory({array: array, highlights: range(start, end+1)});
    return array;
}

function merge(array, start, split, end) {
    if (end <= start) return array;
    let mergeArray = [];
    let i = start, j = split;
    // Compare i and j and add the smaller element to the mergeArray. Increment
    // the index for whichever element was added to mergeArray.
    while (i < split && j <= end) {
        addToHistory({array: array, highlights: [i, j]});
        if (array[i] <= array[j]) {
            mergeArray.push(array[i++]);
        } else {
            mergeArray.push(array[j++]);
        }
    }
    // If there are remaining elements on the left side, add the rest
    while (i < split) {
        addToHistory({array: array, highlights: [i, j-1]});
        mergeArray.push(array[i++]);
    }
    // If there are remaining elements on the right side, add the rest
    while (j <= end) {
        addToHistory({array: array, highlights: [i-1, j]});
        mergeArray.push(array[j++]);
    }

    // Write the sorted elements back into the original array
    for (let k = 0; k < mergeArray.length; k++) {
        addToHistory({array: array, highlights: [start+k]});
        array[start+k] = mergeArray[k];
    }

    return array;
}
