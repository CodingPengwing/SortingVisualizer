export function sort(props) {
    const start = 0;
    const end = props.array.length-1;
    const sortedArray = quickSort(props.array, start, end, props.addToHistory);
    return sortedArray.slice();
}

function quickSort(array, start, end, addToHistory) {
    if (end <= start) return array;

    const p = partition(array, start, end, addToHistory);
    quickSort(array, start, p-1, addToHistory);
    quickSort(array, p+1, end, addToHistory);
    return array;
}

function partition(array, start, end, addToHistory) {
    if (end <= start) return start;

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
    let pivotIndex = j;
    return pivotIndex;
}
