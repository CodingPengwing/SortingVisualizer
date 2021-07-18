// Optimizing using 3-way principle
// https://www.techiedelight.com/quicksort-using-dutch-national-flag-algorithm/

// Optimizing using tail call
// https://www.geeksforgeeks.org/quicksort-tail-call-optimization-reducing-worst-case-space-log-n/

export function sort(props) {
    const array = props.array;
    const start = 0;
    const end = array.length-1;
    const sortedArray = quickSort(array, start, end, props.addToHistory);
    return sortedArray.slice();
}

function quickSort(array, start, end, addToHistory) {
    // // Array has 1 or 0 elements
    // if (end <= start) return array;

    while (start < end) {

        const [pivotLeft, pivotRight] = partition(array, start, end, addToHistory);
        // let range = [];
        // for (let i = start; i <= end; i++) { range.push(i); }
        // addToHistory({array: array.slice(), highlights: range});

        if (pivotLeft - start < end - pivotRight) {
            quickSort(array, start, pivotLeft-1, addToHistory);
            start = pivotRight + 1;
        }
        else {
            quickSort(array, pivotRight+1, end, addToHistory);
            end = pivotLeft - 1;
        }
    }

    addToHistory({array: array.slice(), highlights: []});
    return array;
}



function partition(array, start, end, addToHistory) {
    if (end <= start) return start;

    let pivotIndex = randomIntFromInterval(start, end);
    addToHistory({array: array.slice(), highlights: [start, pivotIndex]});
    [array[end], array[pivotIndex]] = [array[pivotIndex], array[end]];
    addToHistory({array: array.slice(), highlights: [start, pivotIndex]});

    let mid = start;
    let pivot = array[end];

    while (mid <= end) {
        addToHistory({array: array.slice(), highlights: [mid, end]});
        if (array[mid] < pivot) {
            [array[start], array[mid]] = [array[mid], array[start]];
            addToHistory({array: array.slice(), highlights: [start, mid]});
            start++;
            mid++;
        } 
        else if (array[mid] > pivot) {
            [array[mid], array[end]] = [array[end], array[mid]];
            addToHistory({array: array.slice(), highlights: [mid, end]});
            end--;
        } 
        else {
            mid++;
        }
    }
    return [start, mid-1];
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}
