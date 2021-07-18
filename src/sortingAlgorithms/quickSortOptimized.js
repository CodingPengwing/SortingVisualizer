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
    while (start < end) {
        const [pivotLeft, pivotRight] = partition(array, start, end, addToHistory);
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
    if (end <= start) return [start, end];

    let pivotIndex = randomIntFromInterval(start, end);
    addToHistory({array: array.slice(), highlights: [start, pivotIndex]});
    [array[start], array[pivotIndex]] = [array[pivotIndex], array[start]];
    addToHistory({array: array.slice(), highlights: [start, pivotIndex]});

    let mid = start + 1;
    let pivot = array[start];

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

    const pivotLeft = start, pivotRight = end;
    let range = [];
    for (let i = pivotLeft; i <= pivotRight; i++) { range.push(i); }
    addToHistory({array: array.slice(), highlights: range.slice()});

    return [start, mid-1];
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}
