export function sort(props) {
    let array = props.state.array;
    let start = props.start;
    let end = props.end;
    let updateState = props.updateState;
    let step = props.step;

    if (end <= start) return array;
    let p, a;
    [p, step] = partition(props);
    props.step = step;
    [a, step] = sort({state: props.state, start: start, end: p-1, updateState: updateState, step: props.step});
    props.step = step;
    [a, step] = sort({state: props.state, start: p+1, end: end, updateState: updateState, step: props.step});
    props.step = step;
    return [array, step];
}

function partition(props) {
    let array = props.state.array;
    let start = props.start;
    let end = props.end;
    let updateState = props.updateState;
    let step = props.step;


    if (end <= start) return start;
    const pivot = array[start];
    let i = start + 1;
    let j = end;
    while (true) {
        while (array[i] <= pivot && i < j) {
            step += 1;
            console.log(step);
            setTimeout(() => {updateState(array, [pivot, i])}, 500*step);
            i += 1;
        }
        while (array[j] > pivot && i <= j) {
            step += 1;
            console.log(step);
            setTimeout(() => {updateState(array, [pivot, j])}, 500*step);
            j -= 1;
        }
        if (i < j) {
            step += 1;
            console.log(step);
            setTimeout(() => {updateState(array, [i, j])}, 500*step);
            const tmp = array[i];
            array[i] = array[j];
            array[j] = tmp;
        } else {
            break;
        }
    }
    
    step += 1;
    console.log(step);
    setTimeout(() => updateState(array, [pivot, j]), 500*step);
    // Swap pivot into position
    const tmp = array[start];
    array[start] = array[j];
    array[j] = tmp;
    return [j, step];
}
