// About half of the code in this file was borrowed from
// https://www.geeksforgeeks.org/timsort/

import { range } from "./util";

export function sort(props) {
    const sortedArray = timSort(props.array, props.addToHistory);
    props.addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

const MIN_MERGE = 16;

function timSort(array, addToHistory) {
    let n = array.length;
    const minRun = calculateMinRun(n);

    for (let start = 0; start < n; start += minRun) {
        const end = Math.min(start + minRun - 1, n - 1);
        insertionSort(array, start, end, addToHistory);
    }

    let size = minRun;
    while (size < n) {
        for (let start = 0; start < n; start += 2 * size) {
            const split = Math.min(n - 1, start + size - 1);
            const end = Math.min((start + 2 * size - 1), (n - 1));
            if (split < end) {
                merge(array, start, split, end, addToHistory);
            }
        }
        size *= 2;
    }
    return array;
}

// Find the minimum run length that's optimal for merging
function calculateMinRun(n) {
    let r = 0;
    while (n >= MIN_MERGE) {
        r |= (n & 1);
        n >>= 1;
    }
    return n + r;
}

function insertionSort(array, start, end, addToHistory) {
    if (end <= start) return array;
    // Show the current section that's being sorted
    addToHistory({array: array.slice(), highlights: range(start, end+1)});
    // Sort the section using insertion method
    for (let i = start+1; i < end+1; i++) {
        let j = i;
        addToHistory({array: array.slice(), highlights: [j-1, j]});
        while (j > start && array[j] < array[j-1]) {
            [array[j-1], array[j]] = [array[j], array[j-1]];
            addToHistory({array: array.slice(), highlights: [j-1, j]});
            j--;
        }
    }
    return array;
}

function merge(array, start, split, end, addToHistory) {
    if (end <= start) return array;

    // Show the current section that's being sorted
    addToHistory({array: array.slice(), highlights: range(start, end+1)});
    let mergeArray = [];
    let i = start, j = split+1;
    while (i <= split && j <= end) {
        addToHistory({array: array.slice(), highlights: [i, j]});
        if (array[i] <= array[j]) {
            mergeArray.push(array[i++]);
        } else {
            mergeArray.push(array[j++]);
        }
    }

    while (i <= split) {
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
