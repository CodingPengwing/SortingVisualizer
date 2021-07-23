import React from 'react';

import { generateRandomArray, generateSteadyArray, generateSortedArray, 
    generateReverseSortedArray, generateUniformArray, generatePartialUniformArray
} from '../sortingAlgorithms/util';
import { testSortingAlgorithms } from '../sortingAlgorithms/SortingTester';
import { sort as bogoSort } from '../sortingAlgorithms/bogoSort';
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

// import { StyledButton } from '../components/NavBar';
import { Selector } from '../components/SortingSelector';
import styles from './SortingVisualizer.module.scss';

import Description from '../components/SortingDescriptor';

export const BOGO_SORT = "Bogo Sort";
export const BUBBLE_SORT = "Bubble Sort";
export const COCKTAIL_SORT = "Cocktail Shaker Sort";
export const GNOME_SORT = "Gnome Sort";
export const HEAP_SORT = "Heap Sort";
export const INSERTION_SORT = "Insertion Sort";
export const INTRO_SORT = "Intro Sort";
export const MERGE_SORT = "Merge Sort";
export const QUICK_SORT = "Quick Sort";
export const QUICK_SORT_OPTIMIZED = "Quick Sort Optimized";
export const SELECTION_SORT = "Selection Sort";
export const SHELL_SORT = "Shell Sort";
export const TIM_SORT = "Tim Sort";

export const RANDOM_ARRAY = "Random Array";
export const STEADY_ARRAY = "Steady Random Array";
export const SORTED_ARRAY = "Sorted Array";
export const REVERSE_SORTED_ARRAY = "Reverse Sorted Array";
export const UNIFORM_ARRAY = "Uniform Array";
export const PARTIAL_UNIFORM_ARRAY = "Partial Uniform Array";

const MAX_ARRAY_SIZE = 100;
const MIN_VALUE = 5;
const MAX_VALUE = 505;

const INITIAL_ANIMATION_PAUSE_TIME = 10;
const INITIAL_ANIMATION_SPEED = 100;
const MAX_ANIMATION_PAUSE = 510;
const ANIMATION_PAUSE_RANGE = 500;

const PRIMARY_COLOR = '#5FEEEE';
const COMPARE_COLOR = '#5B1092';
const LOCALLY_SORTED_COLOR = '#F0E68C';
const GLOBALLY_SORTED_COLOR = '#20EF5F';

const BOGO_SORT_ARRAY_SIZE = 7;

const TESTING = true;

// This component is used to produce individual bars in an array
class Bar extends React.PureComponent {
    render() {
        return (
            <div 
                className={styles.arrayBar} 
                style={{height: `${this.props.value}px`, backgroundColor: this.props.color}}>
            </div>    
        );
    }
}

// This component is used to produce an entire array of bars representing an array of numbers
class Array extends React.PureComponent {
    renderBar(i) {
        const globallySorted = this.props.highlights.globallySorted;
        const locallySorted = this.props.highlights.locallySorted;
        const comparing = this.props.highlights.comparing;
        let color = PRIMARY_COLOR;
        if (comparing && comparing.includes(i)) {
            color = COMPARE_COLOR;
        } else if (globallySorted && globallySorted.includes(i)) {
            color = GLOBALLY_SORTED_COLOR;
        } else if (locallySorted && locallySorted.includes(i)) {
            color = LOCALLY_SORTED_COLOR;
        }

        return (
            <Bar
                value={this.props.array[i]}
                color={color}
                key={i}
            />
        )
    }

    render() {
        var bars = [];
        let i;
        for (i = 0; i < this.props.array.length; i++) {
            bars.push(this.renderBar(i));
        }
        // Redundant invisible bar at the end of the array container
        // to maintain the height of the array container during animations
        bars.push(<div 
            className={styles.arrayBar}
            style={{height: MAX_VALUE + 30, backgroundColor: "black"}}
            key={i}
        />)

        return (
            <div className={styles.array}>
                {bars}
            </div>
        )
    }
}

// This component controls the animations that are displayed to the user
export default class SortingVisualizer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            arraySize: MAX_ARRAY_SIZE,
            arrayType: STEADY_ARRAY,
            highlights: {
                globallySorted: [], locallySorted: [], comparing: []
            },

            disableSlider: false,
        };

        this.timeoutIDArray = [];
        this.sort = quickSort;
        this.resumePoint = 0;
        this.animationSpeed = INITIAL_ANIMATION_SPEED;
        this.animationPauseTime = INITIAL_ANIMATION_PAUSE_TIME;

        this.history = [];

        // As the name suggests, this function is used to a take a snapshot of a state of the array while it's being sorted.
        // This snapshot is then saved into the history array.
        this.takeSnapshot = (array, comparing, locallySorted, globallySorted) => {
            // We have to use .slice() to save a copy of the arrays in their current state, otherwise,
            // those arrays may change and affect the animations later on.
            this.history.push({array: array.slice(), highlights: {comparing: comparing.slice(), locallySorted: locallySorted.slice(), globallySorted: globallySorted.slice()}});
        };

        this.clearHistory = () => {
            this.history = [];
        }

        this.clearForwardHistory = () => {
            this.history = this.history.slice(0, this.resumePoint + 1);
        }

        this.generateArray = this.generateArray.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.doSort = this.doSort.bind(this);
        this.reset = this.reset.bind(this);
        this.pause = this.pause.bind(this);
        this.resume = this.resume.bind(this);
        this.onChangeArraySize = this.onChangeArraySize.bind(this);
        this.onChangeSortSpeed = this.onChangeSortSpeed.bind(this);
    }

    componentDidMount() {
        this.generateArray(this.state.arrayType);
        if (TESTING) { testSortingAlgorithms(); }
    }

    componentWillUnmount() {
        this.setState({array: []});
        this.clearHistory();
    }

    doSort() {
        this.pause();
        this.clearForwardHistory();
        const sortingAlgorithm = this.sort;
        // Call on the sorting algorithm to sort the array, while adding each important step to history array so we can display them after.
        sortingAlgorithm({array: this.state.array, takeSnapshot: this.takeSnapshot});
        // Sorting complete. So now we display every step that was recorded in history while the sorting algorithm was running.
        this.animateHistory(this.resumePoint);
    }

    animateHistory(startPoint) {
        if (!startPoint) startPoint = 0;
        var pauseTime;
        var count = 1;
        for (let i = startPoint; i < this.history.length; i++) {
            pauseTime = this.animationPauseTime * count;
            let timeoutID = setTimeout(() => {
                this.setState({array: this.history[i].array, highlights: this.history[i].highlights});
                this.resumePoint = i + 1;
            }, pauseTime);
            this.timeoutIDArray.push(timeoutID);
            count++;
        }
    }

    pause() {
        let i = 0;
        while (i < this.timeoutIDArray.length) {
            clearTimeout(this.timeoutIDArray[i++]);
        }
        this.timeoutIDArray = [];
    }

    reset() {
        this.pause();
        if (this.history.length > 0) {
            const originalArray = this.history[0].array.slice();
            this.setState({array: originalArray, highlights: {}});
            this.clearHistory();
            this.resumePoint = 0;
        }
    }

    resume() {
        this.pause();
        this.animateHistory(this.resumePoint);
    }

    onChangeArraySize(arraySize) {
        if (this.state.arraySize !== arraySize) {
            this.generateArray(this.state.arrayType, arraySize);
        }
    }

    onChangeSortSpeed(speed) {
        if (this.animationSpeed !== speed) {
            const percentageSpeed = speed/100;
            var pauseTime = MAX_ANIMATION_PAUSE - (ANIMATION_PAUSE_RANGE * percentageSpeed);
            this.animationSpeed = speed;
            this.animationPauseTime = pauseTime;
            this.pause();
            this.animateHistory(this.resumePoint);
        }
    }


    generateArray(arrayType, arraySize) {
        if (!arraySize) arraySize = this.state.arraySize;
        this.pause();
        this.clearHistory();
        let array;
        switch (arrayType) {
            case RANDOM_ARRAY:
                array = generateRandomArray(arraySize, MIN_VALUE, MAX_VALUE);
                break;
            case STEADY_ARRAY:
                array = generateSteadyArray(arraySize, MIN_VALUE, MAX_VALUE);
                break;
            case SORTED_ARRAY:
                array = generateSortedArray(arraySize, MIN_VALUE, MAX_VALUE);
                break;
            case REVERSE_SORTED_ARRAY:
                array = generateReverseSortedArray(arraySize, MIN_VALUE, MAX_VALUE);
                break;
            case UNIFORM_ARRAY:
                array = generateUniformArray(arraySize, MIN_VALUE, MAX_VALUE);
                break;
            case PARTIAL_UNIFORM_ARRAY:
                array = generatePartialUniformArray(arraySize, MIN_VALUE, MAX_VALUE);
                break;
            default:
                array = [];
                break;
        }
        this.setState({array: array, highlights: {}, arraySize: arraySize, arrayType: arrayType});
        this.resumePoint = 0;
    }

    changeSort(sortType){
        if (sortType === BOGO_SORT){
            this.generateArray(this.state.arrayType, BOGO_SORT_ARRAY_SIZE);
            this.setState({disableSlider: true});
        } 
        else {
            if (this.state.disableSlider) {
                this.generateArray(this.state.arrayType, MAX_ARRAY_SIZE);
                this.setState({disableSlider: false});
            }
        }

        switch (sortType) {
            case BOGO_SORT:
                this.sort = bogoSort;
                break;
            case BUBBLE_SORT:
                this.sort = bubbleSort;
                break;
            case COCKTAIL_SORT:
                this.sort = cocktailShakerSort;
                break;
            case GNOME_SORT:
                this.sort = gnomeSort;
                break;
            case HEAP_SORT:
                this.sort = heapSort;
                break;
            case INSERTION_SORT:
                this.sort = insertionSort;
                break;
            case INTRO_SORT:
                this.sort = introSort;
                break;
            case MERGE_SORT:
                this.sort = mergeSort;
                break;
            case QUICK_SORT:
                this.sort = quickSort;
                break;
            case QUICK_SORT_OPTIMIZED:
                this.sort = quickSortOptimized;
                break;
            case SELECTION_SORT:
                this.sort = selectionSort;
                break;
            case SHELL_SORT:
                this.sort = shellSort;
                break;
            case TIM_SORT:
                this.sort = timSort;
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div>
                <Selector onChangeInput = {this.generateArray} onChangeSort = {this.changeSort} sort = {this.doSort}
                reset = {this.reset} pause = {this.pause} resume = {this.resume} onChangeSize = {this.onChangeArraySize}
                onChangeSpeed = {this.onChangeSortSpeed} disableSlider={this.state.disableSlider}/>

                <div className = {styles.arrayContainer}>
                    <Array array={this.state.array} highlights={this.state.highlights}/>
                </div>
                <div>
                    <Description header = "Description" description = "Lorem Ipsum bla bla..."/>
                    <Description header = "Complexity" description = "Lorem Ipsum bla bla..."/>
                    <Description header = "Founders & Fun Facts" description = "Lorem Ipsum bla bla..."/>
                </div>
            </div>
        );
    }
}
