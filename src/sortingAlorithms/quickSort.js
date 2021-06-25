export function sort(array, start, end, updateState) {
    if (end <= start) return array;
    const p = partition(array, start, end, updateState);
    sort(array, start, p-1, updateState);
    sort(array, p+1, end, updateState);
    return array;
}

function partition(array, start, end, updateState) {
    if (end <= start) return start;
    const pivot = array[start];
    let i = start + 1;
    let j = end;
    while (true) {
        while (array[i] <= pivot && i < j) {
            // setTimeout(() => {updateState(array, [pivot, i])}, 1000);
            // TODO: Check animation logic
            // updateState(array, [pivot, i])
            i += 1;
        }
        while (array[j] > pivot && i <= j) {
            // setTimeout(() => {updateState(array, [pivot, j])}, 1000);
            // TODO: Check animation logic
            // updateState(array, [pivot, j])
            j -= 1;
        }
        if (i < j) {
            // setTimeout(() => {updateState(array, [i, j])}, 1000);
            // TODO: Check animation logic
            // updateState(array, [i, j])
            const tmp = array[i];
            array[i] = array[j];
            array[j] = tmp;
        } else {
            break;
        }
    }
    // Swap pivot into position
    const tmp = array[start];
    array[start] = array[j];
    array[j] = tmp;
    return j;
}
