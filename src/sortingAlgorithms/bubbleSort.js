import { range, swap } from './util';

var takeSnapshot;
var globallySorted;
var comparing;

export function sort(props) {
    globallySorted = [];
    comparing = [];
    takeSnapshot = props.takeSnapshot;
    // Do the sorting
    const sortedArray = bubbleSort(props.array);
    return sortedArray;
}

function bubbleSort(array) {
    if (array.length <= 1) return array;
    // upperLimit is the start index of the section that is sorted
    let upperLimit = array.length;
    let sorted = false;
    // While the array is not sorted, iterate from start to finish and swap adjacent elements that are out of order.
    while (!sorted) {
        sorted = true;
        for (let i = 1; i < upperLimit; i++) {
            comparing = [i-1, i];
            takeSnapshot(array, comparing, [], globallySorted);
            if (array[i-1] > array[i]) {
                swap(array, i-1, i);
                takeSnapshot(array, comparing, [], globallySorted);
                sorted = false;
            }
        }
        upperLimit--;
        globallySorted.push(upperLimit);
    }

    // Here the entire array is sorted.
    takeSnapshot(array, [], [], range(0, array.length));
    return array;
}
