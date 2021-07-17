export function sort(props){
    const array = props.array;
    const addToHistory = props.addToHistory;
    const sortedArray = selectionSort(array, addToHistory);
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

        let temp = array[startIndex];
        array[startIndex] = array[minIndex];
        array[minIndex] = temp;
        addToHistory({array: array.slice(), highlights: [startIndex, minIndex]})
    }

    addToHistory({array: array.slice(), highlights: []});
    return array;
}