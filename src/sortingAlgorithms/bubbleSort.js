export function sort(props) {
    return bubbleSort(props.array, props.addToHistory).slice();
}

function bubbleSort(array, addToHistory) {
    let sorted = false;
    while (!sorted) {
        sorted = true;
        for (let i=1; i<array.length; i++) {
            addToHistory({
                array: array.slice(), 
                highlights: [i-1, i]
            });

            if (array[i-1] > array[i]) {
                [array[i-1], array[i]] = [array[i], array[i-1]]
                addToHistory({
                    array: array.slice(), 
                    highlights: [i-1, i]
                });

                sorted = false;
            }
        }
    }

    addToHistory({
        array: array.slice(), 
        highlights: []
    });
    return array;
}