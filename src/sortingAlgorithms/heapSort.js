export function sort(props) {
    const array = props.array;
    const addToHistory = props.addToHistory;
    const sortedArray = heapSort(array, addToHistory);
    return sortedArray.slice();
}

function heapSort(array, addToHistory) {
    // Add sentinel to top of list
    array.unshift(null);
    bottomUpHeapify(array);
    for (let i=array.length-1; i>0; i--) {
        eject(array, i);
    }
    array.shift();
    return array.slice();
}
    
function bottomUpHeapify(array, addToHistory) {
    const n = array.length;
    for (let i=Math.floor(n/2); i>0; i--) {
        const elem_i = array[i];
        let heap = false;
        while (heap === false && 2*i < n) {
            let j = 2*i;
            if (j < n-1) {
                if (array[j] < array[j+1]) {
                    j += 1;
                }
            }
            if (elem_i >= array[j]) {
                heap = true;
            } else {
                array[i] = array[j];
                i = j;
            }
        }
        array[i] = elem_i;
    }
    return array;
}

//  Eject the first element of the array (after the sentinel) down to position p.
//  Bring element p up to first position and sift down to re-heapify.
function eject(array, p) {
    [array[1], array[p]] = [array[p], array[1]];
    let i = 1;
    let elem_i = array[i];
    let heap = false;
    while (heap === false && 2*i < p) {
        let u = 2*i;
        if (u < p-1) {
            if (array[u] < array[u+1]) {
                u += 1;
            }
        }
        if (elem_i >= array[u]) {
            heap = true;
        } else {
            array[i] = array[u];
            i = u;
        }
    }
    array[i] = elem_i;
    return array;
}
