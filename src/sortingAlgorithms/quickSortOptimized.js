// https://www.techiedelight.com/quicksort-using-dutch-national-flag-algorithm/

export function sort(props) {
    const array = props.array;
    const start = 0;
    const end = array.length-1;
    const sortedArray = quickSort(array, start, end, props.addToHistory);
    return sortedArray.slice();
}

function quickSort(array, start, end, addToHistory) {
    if (end <= start) return array;
    if (end - start === 1) {
        addToHistory({array: array.slice(), highlights: [start, end]});
        if (array[end] < array[start]) {
            [array[start], array[end]] = [array[end], array[start]];
            addToHistory({array: array.slice(), highlights: [start, end]});
            return array;
        }
    }

    const [pivotLeft, pivotRight] = partition(array, start, end, addToHistory);
    let range = [];
    for (let i = start; i <= end; i++) { range.push(i); }
    addToHistory({array: array.slice(), highlights: [start, end]});

    quickSort(array, start, pivotLeft-1, addToHistory);
    quickSort(array, pivotRight+1, end, addToHistory);
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
        if (array[mid] < pivot) {
            [array[start], array[mid]] = [array[mid], array[start]];
            start++;
            mid++;
        } else if (array[mid] > pivot) {
            [array[mid], array[end]] = [array[end], array[mid]];
            end--;
        } else {
            mid++;
        }
    }
    return [start, mid-1];
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}
