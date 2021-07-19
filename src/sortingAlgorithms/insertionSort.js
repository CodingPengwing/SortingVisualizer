export function sort(props) {
    const sortedArray = insertionSort(props.array, props.addToHistory);
    return sortedArray.slice();
}

function insertionSort(array, addToHistory) {
    if (array.length <= 1) return array;
    
    for (let i = 1; i<array.length; i++) {
        let j = i - 1;
        addToHistory({array: array.slice(), highlights: [j, i]});
        while (j >= 0 && array[j] > array[j+1]) {
            addToHistory({array: array.slice(), highlights: [j, j+1]});
            [array[j], array[j+1]] = [array[j+1], array[j]];
            addToHistory({array: array.slice(), highlights: [j, j+1]});
            j -= 1;
        }
        addToHistory({array: array.slice(), highlights: []});
    }
    return array;
}