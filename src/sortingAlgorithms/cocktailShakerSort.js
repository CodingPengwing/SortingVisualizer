import { range, swap } from './util';

var takeSnapshot;
var globallySorted;
var comparing;

export function sort(props) {
    globallySorted = [];
    comparing = [];
    takeSnapshot = props.takeSnapshot;
    // Do the sorting
    const sortedArray = cocktailShakerSort(props.array);
    return sortedArray;
}

function cocktailShakerSort(array) {
    if (array.length <= 1) return array;
    let sorted = false;
    let i;
    let lowerLimit = 0;
    let upperLimit = array.length;

    // While the array is not sorted, swing back and forth from start to end and swap
    // adjacent elements that are out of order.
    while (!sorted) {
        sorted = true;
        i = lowerLimit + 1;
        while (i < upperLimit) {
            comparing = [i-1, i];
            takeSnapshot(array, comparing, [], globallySorted);
            if (array[i-1] > array[i]) {
                swap(array, i-1, i);
                sorted = false;
                takeSnapshot(array, comparing, [], globallySorted);
            }
            i++;
        }
        // We've moved the largest element to the end of the range, we can shrink the range
        upperLimit--;
        globallySorted.push(upperLimit);
        if (sorted) { break; }
        
        sorted = true;
        i = upperLimit - 1;
        while (i > lowerLimit) {
            comparing = [i-1, i];
            takeSnapshot(array, comparing, [], globallySorted);
            if (array[i-1] > array[i]) {
                swap(array, i-1, i);
                sorted = false;
                takeSnapshot(array, comparing, [], globallySorted);
            }
            i--;
        }
        // We've moved the smallest element to the start of the range, we can shrink the range
        globallySorted.push(lowerLimit);
        lowerLimit++;
        if (sorted) { break; }
    }

    // Here the entire array is sorted.
    takeSnapshot(array, [], [], range(0, array.length));
    return array;
}
