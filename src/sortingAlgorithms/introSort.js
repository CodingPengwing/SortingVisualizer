export function sort(props) {
    const sortedArray = introSort(props.array, props.addToHistory);
    props.addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

function introSort(array, addToHistory) {

}