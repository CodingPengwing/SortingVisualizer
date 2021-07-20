import { swap } from "./util";

var addToHistory;

export function sort(props) {
    addToHistory = props.addToHistory;
    const sortedArray = selectionSort(props.array);
    addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

function selectionSort(array){
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
        swap(array, startIndex, minIndex);
        addToHistory({array: array.slice(), highlights: [startIndex, minIndex]});
    }
    return array;
}