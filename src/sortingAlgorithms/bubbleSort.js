export function sort(props) {
    const sortedArray = bubbleSort(props.array, props.addToHistory);
    props.addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

function bubbleSort(array, addToHistory) {
    if (array.length <= 1) return array;
    let sorted = false;
    while (!sorted) {
        sorted = true;
        for (let i=1; i<array.length; i++) {
            addToHistory({array: array.slice(), highlights: [i-1, i]});
            if (array[i-1] > array[i]) {
                [array[i-1], array[i]] = [array[i], array[i-1]]
                addToHistory({array: array.slice(), highlights: [i-1, i]});
                sorted = false;
            }
        }
    }
    return array;
}