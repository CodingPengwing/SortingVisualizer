import { range, swap } from "./util";

var addStateToHistory;
var globallySorted;
var comparing;

export function sort(props) {
    globallySorted = [];
    comparing = [];
    addStateToHistory = props.addStateToHistory;
    const start = 0;
    const end = props.array.length;
    // Do the sorting
    const sortedArray = quickSort(props.array, start, end);
    return sortedArray;
}

function quickSort(array, start, end) {
    if (end - start <= 1) {
        globallySorted.push(start);
        return array;
    }
    // Partition the array
    const p = partition(array, start, end);
    globallySorted.push(p);
    // Sort the left of the partition
    quickSort(array, start, p);
    // Sort the right of the partition
    quickSort(array, p+1, end);
    
    globallySorted.push(...range(start, end));
    addStateToHistory(array, [], [], globallySorted);
    return array;
}

// Partition the range so that the left side is smaller than the pivot and the right side is 
// larger than the pivot.
function partition(array, start, end) {
    if (end - start <= 1) return start;

    // Pick the pivot
    const pivot = array[start];
    let i = start + 1;
    let j = end - 1;
    while (true) {
        // Find an element that is smaller than/equal to the pivot
        while (array[i] <= pivot && i < j) {
            comparing = [start, i, j];
            addStateToHistory(array, comparing, [], globallySorted);
            i += 1;
        }
        // Find an element that is larger than the pivot
        while (array[j] > pivot && i <= j) {
            comparing = [start, i, j];
            addStateToHistory(array, comparing, [], globallySorted);
            j -= 1;
        }
        // Swap the 2 elements only if i is still to the left of j
        if (i < j) {
            comparing = [start, i, j];
            addStateToHistory(array, comparing, [], globallySorted);
            swap(array, i, j);
            addStateToHistory(array, comparing, [], globallySorted);
        } else {
            break;
        }
    }
    
    // Swap pivot into position
    comparing = [start, j];
    addStateToHistory(array, comparing, [], globallySorted);
    swap(array, start, j)
    addStateToHistory(array, comparing, [], globallySorted);
    
    let pivotIndex = j;
    return pivotIndex;
}
