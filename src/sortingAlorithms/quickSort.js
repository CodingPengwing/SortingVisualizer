import React from 'react';

let step = 0;

export function sort(props) {
    let array = props.state.array;
    let start = props.range[0];
    let end = props.range[1];

    if (end <= start) return array;
    let p = partition(props);
    sort({state: props.state, range: [start, p-1], updateState: props.updateState});
    sort({state: props.state, range: [p+1, end], updateState: props.updateState});
    return array;
}

function partition(props) {
    let array = props.state.array;
    let start = props.range[0];
    let end = props.range[1];
    let updateState = props.updateState;

    if (end <= start) return start;
    const pivot = array[start];
    let i = start + 1;
    let j = end;
    while (true) {
        while (array[i] <= pivot && i < j) {
            let arraycopy = array.slice();
            console.log([start, i]);
            step += 1;
            setTimeout(() => {updateState(arraycopy, [start, i])}, 50*step);
            i += 1;
        }
        while (array[j] > pivot && i <= j) {
            let arraycopy = array.slice();
            console.log([start, j]);
            step += 1;
            setTimeout(() => {updateState(arraycopy, [start, j])}, 50*step);
            j -= 1;
        }
        if (i < j) {
            let arraycopy = array.slice();
            console.log([i, j]);
            step += 1;
            setTimeout(() => {updateState(arraycopy, [i, j])}, 50*step);
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


    let arraycopy = array.slice();
    console.log([start, j]);
    step += 1;
    setTimeout(() => updateState(arraycopy, [start, j]), 50*step);
    step += 1;
    setTimeout(() => updateState(arraycopy, []), 50*step);

    return j;
}

