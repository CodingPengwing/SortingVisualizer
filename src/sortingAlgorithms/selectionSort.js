import { range, swap } from "./util";

var addStateToHistory;
var globallySorted;
var comparing;

export function sort(props) {
    globallySorted = [];
    comparing = [];
    addStateToHistory = props.addStateToHistory;
    // Do the sorting
    const sortedArray = selectionSort(props.array);
    return sortedArray;
}

function selectionSort(array){
    if (array.length <= 1) {return array};
    let length = array.length;

    // For each index in the array, find the smallest element in the unsorted range, and move
    // it to the current index.
    for (let start = 0; start < length; start++){
        let minVal = array[start];
        let min = start;
        // Find the smallest element in the unsorted range.
        for (let i = start; i < length; i++){
            comparing = [start, i, min]
            addStateToHistory(array, comparing, [], globallySorted);
            if (minVal > array[i]) {
                minVal = array[i];
                min = i;
            }
        }
        comparing = [start, min];
        // Swap into current index
        addStateToHistory(array, comparing, [], globallySorted);
        swap(array, start, min);
        addStateToHistory(array, comparing, [], globallySorted);
        globallySorted.push(start);
    }
    // comparing = [];
    // addStateToHistory(array, comparing, , []);

    // Here the entire array is sorted.
    addStateToHistory(array, [], [], range(0, array.length));
    return array;
}
