export function sort(props) {
    const sortedArray = gnomeSort(props.array, props.addToHistory);
    props.addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

function gnomeSort(array, addToHistory) {
    if (array.length <= 1) return array;
    let i = 1;
    while (i < array.length) {
        addToHistory({array: array.slice(), highlights: [i-1, i]});
        if (array[i-1] <= array[i]) { i++; }
        else {
            [array[i-1], array[i]] = [array[i], array[i-1]];
            addToHistory({array: array.slice(), highlights: [i-1, i]});
            if (i > 1) { 
                i--; 
            }
        }
    }
    return array;
}
