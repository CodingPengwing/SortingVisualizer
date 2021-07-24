// Generates an array containing all integers between start (inclusive) and end (exclusive)
export function range(start, end) {
    var array = [];
    for (let i = start; i < end; i++) { 
        array.push(i); 
    }
    return array;
}

// Generates a random integer within the given interval, exclusive of max.r
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

/* Randomize array in-place using Durstenfeld shuffle algorithm */
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        swap(array, i, j);
    }
    return array;
}

export function generateRandomArray(arraySize, minValue, maxValue) {
    let array = [];
    for (let i=0; i < arraySize; i++) {
        array.push(randomIntFromInterval(minValue, maxValue));
    }
    return array;
}

// Generate an array that when sorted has equal differences between adjacent elements.
export function generateSteadyArray(arraySize, minValue, maxValue) {
    const gap = Math.floor((maxValue - minValue) / arraySize);
    const multipliers = range(0, arraySize);
    shuffle(multipliers);
    let array = [];
    for (let i = 0; i < multipliers.length; i++) {
        array.push(maxValue - gap * multipliers[i]);
    }
    return array;
}

export function generateSortedArray(arraySize, minValue, maxValue) {
    const gap = Math.floor((maxValue - minValue) / arraySize);
    let array = [];
    for (let i = arraySize - 1; i >= 0; i--) {
        array.push(maxValue - gap * i);
    }
    return array;
}

export function generateReverseSortedArray(arraySize, minValue, maxValue) {
    const gap = Math.floor((maxValue - minValue) / arraySize);
    let array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(maxValue - gap * i);
    }
    return array;
}

export function generateUniformArray(arraySize, minValue, maxValue) {
    const lowerLimit = Math.floor(maxValue - (maxValue - minValue) * 1/4);
    const upperLimit = Math.floor(maxValue);
    const value = randomIntFromInterval(lowerLimit, upperLimit);
    let array = [];
    for (let i = 0; i < arraySize; i++) { 
        array[i] = value;
    }
    return array;
}

export function generatePartialUniformArray(arraySize, minValue, maxValue) {
    const diffValues = 5;
    const gap = Math.floor((maxValue - minValue) / diffValues);
    const values = [];
    for (let i = diffValues - 1; i >= 0; i--) {
        values.push(maxValue - i * gap);
    }

    let array = [];
    for (let i = 0; i < diffValues; i++) {
        for (let j = 0; j < Math.floor(arraySize/diffValues); j++) {
            array.push(values[i]);
        }
    }

    while (array.length < arraySize) {
        array.push(values[randomIntFromInterval(0, 4)]);
    }
    shuffle(array);
    return array;
}
