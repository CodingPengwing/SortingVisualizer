import { swap } from './util';

var addToHistory;

export function sort(props) {
    addToHistory = props.addToHistory;
    const sortedArray = cocktailShakerSort(props.array);
    addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

function cocktailShakerSort(array) {
    if (array.length <= 1) return array;

    let sorted = false;
    let i;
    let lowerLimit = 0;
    let upperLimit = array.length - 1;

    while (!sorted && lowerLimit < upperLimit) {
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
        lowerLimit++;
        if (sorted) { break; }
    }

    return array;
}