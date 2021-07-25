import { swap } from "./util";

var takeSnapshot;
var globallySorted;
var comparing;

export function sort(props) {
    globallySorted = [];
    comparing = [];
    takeSnapshot = props.takeSnapshot;
    const start = 0;
    const end = props.array.length;
    // Do the sorting
    const sortedArray = quickSort(props.array, start, end);
    return sortedArray;
}

function quickSort(array, start, end) {
    if (end - start <= 1) { 
        globallySorted.push(start);
        takeSnapshot(array, [], [], globallySorted);
        return array;
    }
    // Partition the array
    const p = partition(array, start, end);
    if (p !== start && p !== end) {
        globallySorted.push(p);
        takeSnapshot(array, [], [], globallySorted);
    }
    // Sort the left of the partition
    quickSort(array, start, p);
    // Sort the right of the partition
    quickSort(array, p+1, end);
    return array;
}

// Partition the range so that the left side is smaller than the pivot and the right side is 
// larger than the pivot.
function partition(array, start, end) {
    // Pick the pivot
    const pivot = array[start];
    let i = start + 1;
    let j = end - 1;
    while (true) {
        // Find an element that is smaller than/equal to the pivot
        while (array[i] <= pivot && i < j) {
            comparing = [start, i, j];
            takeSnapshot(array, comparing, [], globallySorted);
            i += 1;
        }
        // Find an element that is larger than the pivot
        while (array[j] > pivot && i <= j) {
            comparing = [start, i, j];
            takeSnapshot(array, comparing, [], globallySorted);
            j -= 1;
        }
        // Swap the 2 elements only if i is still to the left of j
        if (i < j) {
            comparing = [start, i, j];
            takeSnapshot(array, comparing, [], globallySorted);
            swap(array, i, j);
            takeSnapshot(array, comparing, [], globallySorted);
        } else {
            break;
        }
    }
    
    // Swap pivot into position
    comparing = [start, j];
    takeSnapshot(array, comparing, [], globallySorted);
    swap(array, start, j)
    takeSnapshot(array, comparing, [], globallySorted);
    
    let pivotIndex = j;
    return pivotIndex;
}
