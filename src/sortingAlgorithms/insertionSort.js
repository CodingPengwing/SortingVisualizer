import { range, swap } from "./util";

var takeSnapshot;
var locallySorted;
var comparing;

export function sort(props) {
    locallySorted = [];
    comparing = [];
    takeSnapshot = props.takeSnapshot;
    // Do the sorting
    const sortedArray = insertionSort(props.array);
    return sortedArray;
}

function insertionSort(array) {
    if (array.length <= 1) return array;
    // Iterate from start to end of the array, for each element, check whether they are larger than 
    // all previous elements. If yes, continue. Otherwise, go backwards and find the correct place for 
    // this element.
    locallySorted.push(0);
    for (let i = 1; i < array.length; i++) {
        locallySorted.push(i);
        let j = i;
        comparing = [j-1, j];
        takeSnapshot(array, comparing, locallySorted, []);
        // This while loop moves backwards if the element is out of order.
        while (j > 0 && array[j-1] > array[j]) {
            swap(array, j-1, j);
            comparing = [j-1, j]
            takeSnapshot(array, comparing, locallySorted, []);
            j--;
        }
    }
    comparing = [];
    takeSnapshot(array, comparing, locallySorted, []);

    // Here the entire array is sorted
    takeSnapshot(array, [], [], range(0, array.length));
    return array;
}
