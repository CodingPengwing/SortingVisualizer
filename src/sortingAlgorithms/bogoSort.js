export function sort(props) {
    if (props.array.length > 7) return props.array.slice();
    return bogoSort(props.array, props.addToHistory).slice();
}

function bogoSort(array, addToHistory) {
    let permutations = perm(array);
    for (let i = 0; i < permutations.length; i++) {
        addToHistory({array: permutations[i], highlights: [permutations[i].keys()]});
        addToHistory({array: permutations[i], highlights: []});
        if (isSorted(permutations[i])) return permutations[i];
    }
}

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

function isSorted(array) {
    let sorted = true;
    for (let i = 0; i < array.length-1; i++) {
        if (array[i] > array[i+1]) {
            sorted = false;
            break;
        }
    }
    return sorted;
}
