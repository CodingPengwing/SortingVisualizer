export function sort(props) {
    const sortedArray = shellSort(props.array, props.addToHistory);
    props.addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

function shellSort(array, addToHistory) {
    // Generate gaps sequence
    let h = 1;
    while (h < array.length) {
        h = 3*h +1;
    }

    while (h > 1) {
        h = Math.floor(h/3);
        for (let i = h; i < array.length; i++) {
            let key = array[i];
            let j = i;
            addToHistory({array: array.slice(), highlights: [i, j-h]});
            while (key < array[j-h]) {
                array[j] = array[j-h];
                addToHistory({array: array.slice(), highlights: [j, j-h]});
                j = j-h;
                if (j < h) break;
            }
            array[j] = key;
        }
    }
    return array;
}
