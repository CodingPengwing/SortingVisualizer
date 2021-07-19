export function sort(props) {

}

const MIN_MERGE = 32;

function timSort(array, addToHistory) {

}

function calculateMinRun(n) {
    let r = 0;
    while (n >= MIN_MERGE)
    {
        r |= (n & 1);
        n >>= 1;
    }
    return n + r;
}

function insertionSort(array, start, end, addToHistory) {
    for (let i = start; i < end+1; i++) {
        let j = i;
        while (j > start && array[j] < array[j-1]) {
            [array[j-1], array[j]] = [array[j], array[j-1]];
            j--;
        }
    }
}

function merge(array, start, end, addToHistory) {}
