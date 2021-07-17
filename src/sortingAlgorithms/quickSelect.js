export function sort(props) {
    const array = props.array;
    const start = 0;
    const end = array.length-1;
    const sortedArray = quickSelect(array, start, end, props.addToHistory);
    return sortedArray.slice();
}

// Select the k-th smallest element as the pivot for the array
function quickSelect(array, start, end, k, addToHistory) {
    if (end <= start) return array;

    const storeIndex = partition(array, start, end, pivotIndex, addToHistory);
    quickSelect(array, start, storeIndex,-1, addToHistory);
    quickSelect(array, storeIndex+1, end, addToHistory);
    return array;
}

function partition(array, start, end, pivotIndex, addToHistory) {
    if (end <= start) return start;

    // Swap the pivot into the first position
    [array[start], array[pivotIndex]] = [array[pivotIndex], array[start]];
    const pivot = array[start];
    let i = start + 1;
    let j = end;
    while (true) {
        while (array[i] <= pivot && i < j) {
            addToHistory({array: array.slice(), highlights: [start, i]});
            i += 1;
        }
        while (array[j] > pivot && i <= j) {
            addToHistory({array: array.slice(), highlights: [start, j]});
            j -= 1;
        }
        if (i < j) {
            addToHistory({array: array.slice(), highlights: [i, j]});
            [array[i], array[j]] = [array[j], array[i]];
            addToHistory({array: array.slice(), highlights: [i, j]});
        } else {
            break;
        }
    }
    
    addToHistory({array: array.slice(), highlights: [start, j]});
    // Swap pivot into position
    [array[start], array[j]] = [array[j], array[start]];
    addToHistory({array: array.slice(), highlights: [start, j]});
    
    addToHistory({array: array.slice(), highlights: []});
    return j;
}


// function selectPivot(array, start, end, k, addToHistory) {
//     if (end <= start) return start;


// }
