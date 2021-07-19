// The majority of code in this file was borrowed from
// https://www.geeksforgeeks.org/timsort/

import { range } from "./util";

export function sort(props) {
    const sortedArray = timSort(props.array, props.addToHistory);
    return sortedArray.slice();
}

const MIN_MERGE = 16;

function timSort(array, addToHistory) {
    let n = array.length;
    const minRun = calculateMinRun(n);

    for (let start = 0; start < n; start += minRun) {
        const end = Math.min(start + minRun - 1, n - 1);
        addToHistory({array: array.slice(), highlights: range(start, end)});
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

    addToHistory({array: array.slice(), highlights: []})
    return array;
}

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

    addToHistory({array: array.slice(), highlights: range(start, end+1)});
    for (let i = start; i < end+1; i++) {
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

    addToHistory({array: array.slice(), highlights: range(start, end+1)});
    let lenLeft = split - start + 1, lenRight = end - split;
    let left = [], right = [];

    for (let i = start; i <= split; i++) {
        left.push(array[i]);
    }
    for (let j = split + 1; j <= end; j++) {
        right.push(array[j]);
    }

    // CHANGE K TO 0
    let i=0, j=0, k=start;

    while (i < lenLeft && j < lenRight) {
        addToHistory({array: array.slice(), highlights: [i, j]});
        if (left[i] <= right[j]) {
            array[k++] = left[i++];
        }
        else {
            array[k++] = right[j++];
        }
    }

    while (i < lenLeft) {
        addToHistory({array: array.slice(), highlights: [i, j-1]});
        array[k++] = left[i++];
    }
    while (j < lenRight) {
        addToHistory({array: array.slice(), highlights: [i-1, j]});
        array[k++] = right[j++];
    }

    return array;
}


