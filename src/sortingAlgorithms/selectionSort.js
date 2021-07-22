import { swap } from "./util";

var addToHistory;

export function sort(props) {
    addToHistory = props.addToHistory;
    // Do the sorting
    const sortedArray = selectionSort(props.array);
    // Finish the history by adding the final sorted array.
    addToHistory({array: sortedArray, highlights: []});
    return sortedArray;
}

function selectionSort(array){
    if (array.length <= 1) {return array};
    let length = array.length;

    // For each index in the array, find the smallest element in the unsorted range, and move
    // it to the current index.
    for (let startIndex = 0; startIndex < length; startIndex++){
        let minVal = array[startIndex];
        let minIndex = startIndex;
        // Find the smallest element in the unsorted range.
        for (let i = startIndex; i < length; i++){
            addToHistory({array: array, highlights: [startIndex, i, minIndex]})
            if (minVal > array[i]){
                minVal = array[i];
                minIndex = i;
            }
        }
        // Swap into current index
        addToHistory({array: array, highlights: [startIndex, minIndex]});
        swap(array, startIndex, minIndex);
        addToHistory({array: array, highlights: [startIndex, minIndex]});
    }
    return array;
}
