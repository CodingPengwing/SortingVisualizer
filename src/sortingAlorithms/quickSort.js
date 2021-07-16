export function sort(props) {
    let array = props.state.array;
    let start = props.range[0];
    let end = props.range[1];

    if (end <= start) return array;
    let p = partition(props);
    sort({state: props.state, range: [start, p-1], addToHistory: props.addToHistory});
    sort({state: props.state, range: [p+1, end], addToHistory: props.addToHistory});
    return array;
}

function partition(props) {
    let array = props.state.array;
    let start = props.range[0];
    let end = props.range[1];
    let addToHistory = props.addToHistory;

    if (end <= start) return start;
    const pivot = array[start];
    let i = start + 1;
    let j = end;
    while (true) {
        while (array[i] <= pivot && i < j) {
            addToHistory({
                array: array.slice(), 
                highlights: [start, i]
            });
            i += 1;
        }
        while (array[j] > pivot && i <= j) {
            addToHistory({
                array: array.slice(), 
                highlights: [start, j]
            });
            j -= 1;
        }
        if (i < j) {
            addToHistory({
                array: array.slice(), 
                highlights: [i, j]
            });
            [array[i], array[j]] = [array[j], array[i]];
            addToHistory({
                array: array.slice(), 
                highlights: [i, j]
            });
        } else {
            break;
        }
    }
    
    addToHistory({
        array: array.slice(), 
        highlights: [start, j]
    });
    // Swap pivot into position
    [array[start], array[j]] = [array[j], array[start]];
    addToHistory({
        array: array.slice(), 
        highlights: [start, j]
    });
    
    addToHistory({
        array: array.slice(), 
        highlights: []
    });

    return j;
}
