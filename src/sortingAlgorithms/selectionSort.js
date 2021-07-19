export function sort(props){
    const sortedArray = selectionSort(props.array, props.addToHistory);
    props.addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

function selectionSort(array, addToHistory){
    if (array.length <= 1) {return array};
    let length = array.length;

    for (let startIndex = 0; startIndex < length; startIndex++){
        let minVal = array[startIndex];
        let minIndex = startIndex;
        for (let i = startIndex; i < length; i++){
            addToHistory({array: array.slice(), highlights: [startIndex, i, minIndex]})
            if (minVal > array[i]){
                minVal = array[i];
                minIndex = i;
            }
        }

        addToHistory({array: array.slice(), highlights: [startIndex, minIndex]});
        [array[startIndex], array[minIndex]] = [array[minIndex], array[startIndex]];
        addToHistory({array: array.slice(), highlights: [startIndex, minIndex]});
    }
    return array;
}