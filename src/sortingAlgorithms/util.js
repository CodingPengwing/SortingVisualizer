// Returns an array containing all integers between start (inclusive) and end (exclusive)
export function range(start, end) {
    var array = [];
    for (let i = start; i < end; i++) { 
        array.push(i); 
    }
    return array.slice();
}

export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}

export function swap(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]];
}
