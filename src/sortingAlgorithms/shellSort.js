import { range, swap } from './util';

var takeSnapshot;
var globallySorted;
var comparing;

export function sort(props) {
    globallySorted = [];
    comparing = [];
    takeSnapshot = props.takeSnapshot;
    // Do the sorting
    const sortedArray = shellSort(props.array);
    return sortedArray;
}

function shellSort(array) {
    // Generate gaps sequence
    let h = 1;
    while (h < array.length) {
        h = 3 * h + 1;
    }

    // Start with big gaps, iterate through the array and compare elements that are
    // gap-distanced apart. If they are out of order, propagate back while taking 
    // gap-distanced steps until they are in order.
    // Gradually decrement the gap until it gets to 1, which is basically insertion sort.
    while (h > 1) {
        // Decrement the gap
        h = Math.floor(h/3);
        for (let i = h; i < array.length; i++) {
            let j = i;
            comparing = [j-h, j];
            takeSnapshot(array, comparing, [], globallySorted);
            // If elements are out of order, propagate them backwards
            while (array[j] < array[j-h]) {
                swap(array, j, j-h);
                comparing = [j-h, j];
                takeSnapshot(array, comparing, [], globallySorted);
                j = j - h;
                if (j < h) break;
            }
            if (h === 1) { 
                if (i === 1) { globallySorted.push(0); }
                globallySorted.push(i);
            }
        }
    }

    // Here the entire array is sorted.
    takeSnapshot(array, [], [], range(0, array.length));
    return array;
}
