export function sort(props) {
    const array = props.array;
    const addToHistory = props.addToHistory;
    const sortedArray = insertionSort(array, addToHistory);
    return sortedArray.slice();
}

function insertionSort(array, addToHistory) {
    if (array.length <= 1) return array;
    
    for (let i=0; i<array.length; i++) {
        let j = i - 1;
        addToHistory({array: array.slice(), highlights: [j, i]});
        while (j >= 0 && array[j+1] < array[j]) {
            addToHistory({array: array.slice(), highlights: [j+1, j]});
            [array[j+1], array[j]] = [array[j], array[j+1]];
            addToHistory({array: array.slice(), highlights: [j+1, j]});
            j -= 1;
        }
        addToHistory({array: array.slice(), highlights: []});
    }
    return array;
}
