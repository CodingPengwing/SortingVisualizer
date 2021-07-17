import * as quickSort from './quickSort';
import * as mergeSort from './mergeSort';
import * as heapSort from './heapSort';
import * as insertionSort from './insertionSort';
import * as bubbleSort from './bubbleSort';
import * as cocktailShakerSort from './cocktailShakerSort';

const ARRAY_SIZE = 100;
const TEST_RUNS = 100;
const MIN_VALUE = -2000;
const MAX_VALUE = 2000;

export function testSortingAlgorithms() {
    console.log("Testing Quick Sort:");
    testSort(quickSort.sort);
    console.log("Testing Heap Sort:");
    testSort(heapSort.sort);
    console.log("Testing Insertion Sort:");
    testSort(insertionSort.sort);
    console.log("Testing Bubble Sort:");
    testSort(bubbleSort.sort);
    console.log("Testing Cocktail Shaker Sort:");
    testSort(cocktailShakerSort.sort);
    // console.log("Testing Merge Sort:");
    // testMergeSort();
}
    
function testSort(sortingAlgorithm) {
    for (let i = 0; i < TEST_RUNS; i++) {
        const array = randomArray();
        const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
        const sortedArray = sortingAlgorithm({
            array: array.slice(), 
            range: [0, array.length-1], 
            addToHistory: () => {},
        });
        console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
    }
}



function randomArray() {
    const array = [];
    for (let i=0; i<ARRAY_SIZE; i++) {
        array.push(randomIntFromInterval(MIN_VALUE, MAX_VALUE));
    }
    return array.slice();
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}

function arraysAreEqual(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) return false;
    }
    return true;
}
