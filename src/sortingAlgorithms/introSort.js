// import { swap } from "./util";

var addToHistory;

export function sort(props) {
    addToHistory = props.addToHistory;
    const sortedArray = introSort(props.array);
    addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

function introSort(array) {

}