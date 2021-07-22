import { range, isSorted } from './util';

// The size of input for bogoSort is limited to 7 due to the factorial growth.
var MAX_SORT_SIZE = 7;
var addToHistory;

export function sort(props) {
    addToHistory = props.addToHistory;
    if (props.array.length > MAX_SORT_SIZE) return props.array.slice();
    // Do the sorting
    const sortedArray = bogoSort(props.array);
    // Finish the history by adding the final sorted array.
    addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

function bogoSort(array) {
    // Generate different permutations for this array.
    let permutations = perm(array);
    // Find the permutation that is in sorted order and return it.
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