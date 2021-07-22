import { swap } from './util';

var addToHistory;

export function sort(props) {
    addToHistory = props.addToHistory;
    // Do the sorting
    const sortedArray = cocktailShakerSort(props.array);
    // Finish the history by adding the final sorted array.
    addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

function cocktailShakerSort(array) {
    if (array.length <= 1) return array;
    let sorted = false;
    let i;
    let lowerLimit = 0;
    let upperLimit = array.length - 1;

    // While the array is not sorted, swing back and forth from start to end and swap
    // adjacent elements that are out of order.
    while (!sorted) {
        sorted = true;
        i = lowerLimit+1;
        while (i <= upperLimit) {
            addToHistory({array: array.slice(), highlights: [i-1, i]});
            if (array[i-1] > array[i]) {
                swap(array, i-1, i);
                sorted = false;
                addToHistory({array: array.slice(), highlights: [i-1, i]});
            }
            i++;
        }
        // We've moved the largest element to the end of the range, we can shrink the range
        upperLimit--;
        if (sorted) { break; }
        
        sorted = true;
        i = upperLimit;
        while (i > lowerLimit) {
            addToHistory({array: array.slice(), highlights: [i-1, i]});
            if (array[i-1] > array[i]) {
                swap(array, i-1, i);
                sorted = false;
                addToHistory({array: array.slice(), highlights: [i-1, i]});
            }
            i--;
        }
        // We've moved the smallest element to the start of the range, we can shrink the range
        lowerLimit++;
        if (sorted) { break; }
    }

    return array;
}
