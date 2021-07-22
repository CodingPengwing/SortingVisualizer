// import { sort as bogoSort } from './bogoSort';
import { sort as bubbleSort } from './bubbleSort';
import { sort as cocktailShakerSort } from './cocktailShakerSort';
import { sort as gnomeSort } from './gnomeSort';
import { sort as heapSort } from './heapSort';
import { sort as insertionSort } from './insertionSort';
import { sort as introSort } from './introSort';
import { sort as mergeSort } from './mergeSort';
import { sort as quickSort } from './quickSort';
import { sort as quickSortOptimized } from './quickSortOptimized';
import { sort as selectionSort } from './selectionSort';
import { sort as shellSort } from './shellSort';
import { sort as timSort } from './timSort';

const MIN_ARRAY_SIZE = 50;
const MAX_ARRAY_SIZE = 100;
const TEST_RUNS = 100;
const MIN_VALUE = -2000;
const MAX_VALUE = 2000;

export function testSortingAlgorithms() {
    var success = true;
    console.log("Testing Bubble Sort:");
    if (!testSort(bubbleSort)) success = false;
    console.log("Testing Cocktail Shaker Sort:");
    if (!testSort(cocktailShakerSort)) success = false;
    console.log("Testing Gnome Sort:");
    if (!testSort(gnomeSort)) success = false;
    console.log("Testing Heap Sort:");
    if (!testSort(heapSort)) success = false;
    console.log("Testing Insertion Sort:");
    if (!testSort(insertionSort)) success = false;
    console.log("Testing Intro Sort:");
    if (!testSort(introSort)) success = false;
    console.log("Testing Merge Sort:");
    if (!testSort(mergeSort)) success = false;
    console.log("Testing Quick Sort:");
    if (!testSort(quickSort)) success = false;
    console.log("Testing Quick Sort Optimized:");
    if (!testSort(quickSortOptimized)) success = false;
    console.log("Testing Selection Sort:");
    if (!testSort(selectionSort)) success = false;
    console.log("Testing Shell Sort:");
    if (!testSort(shellSort)) success = false;
    console.log("Testing Tim Sort:");
    if (!testSort(timSort)) success = false;

    if (success) console.log("All tests completed successfully. Dope!");
    else console.log("Testing failed, try again human.");
}
    
function testSort(sortingAlgorithm) {
    var success = true;
    var successCount = 0;
    for (let i = 0; i < TEST_RUNS; i++) {
        const array = randomArray();
        const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
        const mySortedArray = sortingAlgorithm({
            array: array.slice(), 
            range: [0, array.length-1], 
            addStateToHistory: () => {},
        });
        if (!arraysAreEqual(javaScriptSortedArray, mySortedArray)) {
            success = false;
        } else {
            successCount++;
        }
    }
    console.log("Success/Failure: " + successCount.toString() + "/" + (TEST_RUNS - successCount).toString());
    return success;
}

function randomArray() {
    const array = [];
    const length = randomIntFromInterval(MIN_ARRAY_SIZE, MAX_ARRAY_SIZE);
    for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(MIN_VALUE, MAX_VALUE));
    }
    return array;
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
