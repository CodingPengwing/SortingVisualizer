import { swap } from "./util";

var addStateToHistory;

export function sort(props) {
    addStateToHistory = props.addStateToHistory;
    const start = 0;
    const end = props.array.length-1;
    // Do the sorting
    const sortedArray = quickSort(props.array, start, end);
    // Finish the history by adding the final sorted array.
    addStateToHistory({array: sortedArray, highlights: []});
    return sortedArray;
}

function quickSort(array, start, end) {
    if (end <= start) return array;
    // Partition the array
    const p = partition(array, start, end);
    // Sort the left of the partition
    quickSort(array, start, p-1);
    // Sort the right of the partition
    quickSort(array, p+1, end);
    return array;
}

// Partition the range so that the left side is smaller than the pivot and the right side is 
// larger than the pivot.
function partition(array, start, end) {
    if (end <= start) return start;

    // Pick the pivot
    const pivot = array[start];
    let i = start + 1;
    let j = end;
    while (true) {
        // Find an element that is smaller than/equal to the pivot
        while (array[i] <= pivot && i < j) {
            addStateToHistory({array: array, highlights: [start, i, j]});
            i += 1;
        }
        // Find an element that is larger than the pivot
        while (array[j] > pivot && i <= j) {
            addStateToHistory({array: array, highlights: [start, i, j]});
            j -= 1;
        }
        // Swap the 2 elements only if i is still to the left of j
        if (i < j) {
            addStateToHistory({array: array, highlights: [start, i, j]});
            swap(array, i, j);
            addStateToHistory({array: array, highlights: [start, i, j]});
        } else {
            break;
        }
    }
    
    // Swap pivot into position
    addStateToHistory({array: array, highlights: [start, j]});
    swap(array, start, j)
    addStateToHistory({array: array, highlights: [start, j]});
    
    let pivotIndex = j;
    return pivotIndex;
}
