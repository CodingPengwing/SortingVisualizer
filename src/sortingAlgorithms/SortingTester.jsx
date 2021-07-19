// import { sort as bogoSort } from '../sortingAlgorithms/bogoSort';
import { sort as bubbleSort } from '../sortingAlgorithms/bubbleSort';
import { sort as cocktailShakerSort } from '../sortingAlgorithms/cocktailShakerSort';
import { sort as gnomeSort } from '../sortingAlgorithms/gnomeSort';
import { sort as heapSort } from '../sortingAlgorithms/heapSort';
import { sort as insertionSort } from '../sortingAlgorithms/insertionSort';
import { sort as introSort } from '../sortingAlgorithms/introSort';
import { sort as mergeSort } from '../sortingAlgorithms/mergeSort';
import { sort as quickSort } from '../sortingAlgorithms/quickSort';
import { sort as quickSortOptimized } from '../sortingAlgorithms/quickSortOptimized';
import { sort as selectionSort } from '../sortingAlgorithms/selectionSort';
import { sort as shellSort } from '../sortingAlgorithms/shellSort';
import { sort as timSort } from '../sortingAlgorithms/timSort';

const ARRAY_SIZE = 50;
const TEST_RUNS = 100;
const MIN_VALUE = 0;
const MAX_VALUE = 500;

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
    for (let i = 0; i < TEST_RUNS; i++) {
        const array = randomArray();
        const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
        const mySortedArray = sortingAlgorithm({
            array: array.slice(), 
            range: [0, array.length-1], 
            addToHistory: () => {},
        });
        if (!arraysAreEqual(javaScriptSortedArray, mySortedArray)) {
            success = false;
        }
        console.log(success);
    }
    return success;
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
