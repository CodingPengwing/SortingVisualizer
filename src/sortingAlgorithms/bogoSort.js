import { range, isSorted } from './util';

export function sort(props) {
    // The size of input for bogoSort is limited to 7 due to the factorial growth.
    if (props.array.length > 7) return props.array.slice();
    const sortedArray = bogoSort(props.array, props.addToHistory);
    props.addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

function bogoSort(array, addToHistory) {
    let permutations = perm(array);
    for (let i = 0; i < permutations.length; i++) {
        addToHistory({array: permutations[i], highlights: range(0, array.length)});
        if (isSorted(permutations[i])) {
            return permutations[i];
        }
    }
}

// Generate permutations of an array, returns an array of arrays
// https://stackoverflow.com/questions/37579994/generate-permutations-of-javascript-array
function perm(xs) {
    let output = [];
  
    for (let i = 0; i < xs.length; i = i + 1) {
        let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));
    
        if(!rest.length) {
            output.push([xs[i]])
        } else {
            for(let j = 0; j < rest.length; j = j + 1) {
            output.push([xs[i]].concat(rest[j]))
            }
        }
    }
    return output;
}
