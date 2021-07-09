import React from 'react';

// export function sort(props) {
//     let array = props.state.array;
//     let start = props.start;
//     let end = props.end;
//     let updateState = props.updateState;
//     let step = props.step;

//     if (end <= start) return array;
//     let p, a;
//     [p, step] = partition(props);
//     props.step = step;
//     [a, step] = sort({state: props.state, start: start, end: p-1, updateState: updateState, step: props.step});
//     props.step = step;
//     [a, step] = sort({state: props.state, start: p+1, end: end, updateState: updateState, step: props.step});
//     props.step = step;
//     return [array, step];
// }

// function partition(props) {
//     let array = props.state.array;
//     let start = props.start;
//     let end = props.end;
//     let updateState = props.updateState;
//     let step = props.step;


//     if (end <= start) return start;
//     const pivot = array[start];
//     let i = start + 1;
//     let j = end;
//     while (true) {
//         while (array[i] <= pivot && i < j) {
//             step += 1;
//             console.log(step);
//             setTimeout(() => {updateState(array, [pivot, i])}, 500*step);
//             i += 1;
//         }
//         while (array[j] > pivot && i <= j) {
//             step += 1;
//             console.log(step);
//             setTimeout(() => {updateState(array, [pivot, j])}, 500*step);
//             j -= 1;
//         }
//         if (i < j) {
//             step += 1;
//             console.log(step);
//             setTimeout(() => {updateState(array, [i, j])}, 500*step);
//             const tmp = array[i];
//             array[i] = array[j];
//             array[j] = tmp;
//         } else {
//             break;
//         }
//     }
    
//     step += 1;
//     console.log(step);
//     setTimeout(() => updateState(array, [pivot, j]), 500*step);
//     // Swap pivot into position
//     const tmp = array[start];
//     array[start] = array[j];
//     array[j] = tmp;
//     return [j, step];
// }


// export class StepCounter extends React.Component {
//     constructor(props) {
//         super(props);
//         this.step = 0;

//         this.incrementStep = () => { this.step += 1; }
//     };
// }

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

