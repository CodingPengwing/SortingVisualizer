// Generates an array containing all integers between start (inclusive) and end (exclusive)
export function range(start, end) {
    var array = [];
    for (let i = start; i < end; i++) { 
        array.push(i); 
    }
    return array.slice();
}

// Generates a random integer within the given interval
export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}

// Swap 2 elements at indices i and j in an array
export function swap(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]];
}

// Checks whether an array is sorted
export function isSorted(array) {
    let sorted = true;
    for (let i = 0; i < array.length-1; i++) {
        if (array[i] > array[i+1]) {
            sorted = false;
            break;
        }
    }
    return sorted;
}
