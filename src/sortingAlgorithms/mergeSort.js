import { range } from './util';

var takeSnapshot;
var globallySorted;
var locallySorted;
var comparing;

export function sort(props) {
    globallySorted = [];
    locallySorted = [];
    comparing = [];
    takeSnapshot = props.takeSnapshot;
    const start = 0;
    const end = props.array.length;
    // Do the sorting
    let sortedArray = mergeSort(props.array, start, end);
    return sortedArray;
}

// start is the starting index of the array
// end is the last index of the array (exclusive)
function mergeSort(array, start, end) {
    if (end - start <= 1) return array;

    // Split down the middle and recurse left, right
    const len = end - start;
    const split = start + Math.ceil(len/2);
    mergeSort(array, start, split);
    mergeSort(array, split, end);

    // If this partition has been locally sorted before, it's no longer locally sorted
    // because we now need to merge it.
    if (locallySorted.includes(start)) {
        for (let i = 0; i < locallySorted.length; i++) {
            if (start <= locallySorted[i] && locallySorted[i] < end) {
                locallySorted[i] = -1;
            }
        }
        comparing = [];
        takeSnapshot(array, comparing, locallySorted, []);
    }

    // Only merge the left and right arrays if elements are out of order.
    if (array[split-1] > array[split]) {
        merge(array, start, split, end);
    } else {
        comparing = range(start, end);
        takeSnapshot(array, comparing, locallySorted, []);
        comparing = []
        locallySorted.push(...range(start, end));
        takeSnapshot(array, comparing, locallySorted, []);
        if (end - start === array.length) {
            // Here the entire array is sorted.
            takeSnapshot(array, [], [], range(start, end));
        }
    }

    return array;
}

function merge(array, start, split, end) {
    if (end - start <= 1) return array;

    let mergeArray = [];
    let i = start, j = split;
    // Compare i and j and add the smaller element to the mergeArray. Increment
    // the index for whichever element was added to mergeArray.
    while (i < split && j < end) {
        comparing = [i, j];
        takeSnapshot(array, comparing, locallySorted, []);
        if (array[i] <= array[j]) {
            mergeArray.push(array[i++]);
        } else {
            mergeArray.push(array[j++]);
        }
    }
    // If there are remaining elements on the left side, add the rest
    while (i < split) {
        comparing = [i];
        takeSnapshot(array, comparing, locallySorted, []);
        mergeArray.push(array[i++]);
    }
    // If there are remaining elements on the right side, add the rest
    while (j < end) {
        comparing = [j];
        takeSnapshot(array, comparing, locallySorted, []);
        mergeArray.push(array[j++]);
    }

    // Determine if this is the very last merge operation to sort the array
    let lastMerge = false;
    if (end - start === array.length) {
        lastMerge = true;
    }

    // Write the sorted elements back into the original array
    for (let k = 0; k < mergeArray.length; k++) {
        array[start+k] = mergeArray[k];
        locallySorted.push(start+k);
        if (lastMerge) { globallySorted.push(start+k); }
        comparing = [start+k];
        takeSnapshot(array, comparing, locallySorted, globallySorted);
    }

    comparing = [];
    takeSnapshot(array, comparing, locallySorted, globallySorted);
    return array;
}
