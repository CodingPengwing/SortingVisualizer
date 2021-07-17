import * as mergeSort from './mergeSort';
import * as insertionSort from './insertionSort';
import * as quickSort from './quickSort';
import * as heapSort from './heapSort';

const ARRAY_SIZE = 100;
const TEST_RUNS = 100;
const MIN_VALUE = -2000;
const MAX_VALUE = 2000;

export function testSortingAlgorithms() {
    console.log("Testing Quick Sort:");
    testQuickSort();
    console.log("Testing Heap Sort:");
    testHeapSort();
    console.log("Testing Insertion Sort:");
    testInsertionSort();
    // console.log("Testing Merge Sort:");
    // testMergeSort();
}

function randomArray() {
    const array = [];
    for (let i=0; i<ARRAY_SIZE; i++) {
        array.push(randomIntFromInterval(MIN_VALUE, MAX_VALUE));
    }
    return array.slice();
}
    
function testQuickSort() {
    for (let i = 0; i < TEST_RUNS; i++) {
        const array = randomArray();
        const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
        const sortedArray = quickSort.sort({
            array: array.slice(), 
            range: [0, array.length-1], 
            addToHistory: () => {},
        });
        console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
    }
}

function testMergeSort() {
    for (let i = 0; i < TEST_RUNS; i++) {
        const array = randomArray();
        const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
        const sortedArray = mergeSort.sort({
            array: array.slice(), 
            range: [0, array.length-1], 
            addToHistory: () => {},
        });
        console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
    }
}

function testHeapSort() {
    for (let i = 0; i < TEST_RUNS; i++) {
        const array = randomArray();
        const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
        const sortedArray = heapSort.sort({
            array: array.slice(), 
            range: [0, array.length-1], 
            addToHistory: () => {},
        });
        console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
    }
}
  
function testInsertionSort() {
    for (let i = 0; i < TEST_RUNS; i++) {
        const array = randomArray();
        const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
        const sortedArray = insertionSort.sort({
            array: array.slice(), 
            range: [0, array.length-1], 
            addToHistory: () => {},
        });
        console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
    }
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
