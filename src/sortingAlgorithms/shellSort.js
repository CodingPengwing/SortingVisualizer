var addToHistory;

export function sort(props) {
    addToHistory = props.addToHistory;
    // Do the sorting
    const sortedArray = shellSort(props.array);
    // Finish the history by adding the final sorted array.
    addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

function shellSort(array) {
    // Generate gaps sequence
    let h = 1;
    while (h < array.length) {
        h = 3 * h + 1;
    }

    // Start with big gaps, iterate through the array and compare elements that are
    // gap-distanced apart. If they are out of order, propagate back while taking 
    // gap-distanced steps until they are in order.
    // Gradually decrement the gap until it gets to 1, which is basically insertion sort.
    while (h > 1) {
        // Decrement the gap
        h = Math.floor(h/3);
        for (let i = h; i < array.length; i++) {
            let key = array[i];
            let j = i;
            addToHistory({array: array.slice(), highlights: [i, j-h]});
            // If elements are out of order, propagate them backwards
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
