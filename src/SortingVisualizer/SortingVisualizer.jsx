import React from 'react';

import { generateRandomArray, generateSteadyArray, generateSortedArray, generateReverseSortedArray, generateUniformArray, generatePartialUniformArray} from '../sortingAlgorithms/util';
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

import { Controller } from '../components/Controller';
import { Footer } from '../components/Footer';
import styles from './SortingVisualizer.module.scss';

import Description from '../components/SortingDescriptor';
import { HistoryManager, MAX_SORT_CYCLE_VALUE } from '../components/HistoryManager';

import { colorSets, SOLID_COLOR_SET, BOTTOM_GLOW_COLOR_SET, TOP_GLOW_COLOR_SET, HIGH_CONTRAST_COLOR_SET } from './colorSets';

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

export const MIN_ARRAY_SIZE = 5;
export const MAX_ARRAY_SIZE = 100;
export const MIN_VALUE = 5;
export const MAX_VALUE = 505;

const INITIAL_ANIMATION_PAUSE_TIME = 10;
export const INITIAL_ANIMATION_SPEED = 100;
const MAX_ANIMATION_PAUSE = 510;
const ANIMATION_PAUSE_RANGE = 500;

export const BOGO_SORT_ARRAY_SIZE = 7;

const TEST_SORTING_ALGORITHMS = false;

// This component is used to produce individual bars in an array
class Bar extends React.PureComponent {
    render() {
        return (
            <div 
                className={styles.arrayBar} 
                style={{
                    height: `${this.props.value}px`,
                    backgroundImage: this.props.color,
                    opacity: 0.90,
                    width: `${this.props.width}%`
                }}>
            </div>    
        );
    }
}

// This component is used to produce an entire array of bars representing an array of numbers
class Array extends React.PureComponent {
    constructor(props) {
        super(props);
        this.arrayLength = MAX_ARRAY_SIZE;
        this.count = 0;
    }

    renderBar(i) {
        const globallySorted = this.props.highlights.globallySorted;
        const locallySorted = this.props.highlights.locallySorted;
        const comparing = this.props.highlights.comparing;

        let color = this.props.colorSet.primaryColor;
        if (comparing && comparing.includes(i)) {
            color = this.props.colorSet.compareColor;
        } else if (globallySorted && globallySorted.includes(i)) {
            color = this.props.colorSet.globallySortedColor;
        } else if (locallySorted && locallySorted.includes(i)) {
            color = this.props.colorSet.locallySortedColor;
        }

        if (this.props.array.length > this.arrayLength) {
            this.count++;
        }
        this.arrayLength = this.props.array.length;

        return (
            <Bar
                value={this.props.array[i]}
                color={color}
                key={this.count*MAX_ARRAY_SIZE + i}
                width={this.calculateBarWidth(this.props.array.length)}
            />
        )
    }

    calculateBarWidth(arrayLength) {
        return (0.75 * MAX_ARRAY_SIZE / arrayLength);
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
            style={{height: MAX_VALUE + 30, backgroundColor: "#0000"}}
            key={i}
        />)

        return (
            <div className={styles.arrayContainer}>
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

            disableArraySizeSlider: false,
            disableSortCycleSlider: true,
            animating: false,
            sortCycleValue: 1,
            colorSet: colorSets.solidColors,
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
        this.changeColor = this.changeColor.bind(this);
        this.doSort = this.doSort.bind(this);
        this.reset = this.reset.bind(this);
        this.pause = this.pause.bind(this);
        this.resume = this.resume.bind(this);
        this.pauseResume = this.pauseResume.bind(this);
        this.onChangeArraySize = this.onChangeArraySize.bind(this);
        this.onChangeSortSpeed = this.onChangeSortSpeed.bind(this);
        this.onChangeSortCycle = this.onChangeSortCycle.bind(this);
        this.stepBackward = this.stepBackward.bind(this);
        this.stepForward = this.stepForward.bind(this);
    }

    componentDidMount() {
        this.generateArray(this.state.arrayType);
        if (TEST_SORTING_ALGORITHMS) { testSortingAlgorithms(); }
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
        this.setState({disableSortCycleSlider: false});
    }

    goToState(i) {
        if (i < this.history.length) {
            var displayState = this.history[i];
            var array = displayState.array.slice();
            var comparing = displayState.highlights.comparing.slice();
            var locallySorted = displayState.highlights.locallySorted.slice();
            var globallySorted = displayState.highlights.globallySorted.slice();
            this.setState({array: array, highlights: {comparing: comparing, locallySorted: locallySorted, globallySorted: globallySorted}});
            this.resumePoint = i;
        }
    }

    animateHistory(startPoint) {
        if (this.startPoint >= this.history.length - 1) {
            return;
        }
        if (!startPoint) { startPoint = 0; }
        var pauseTime;
        var count = 1;
        for (let i = startPoint; i < this.history.length; i++) {
            pauseTime = this.animationPauseTime * count;
            let timeoutID = setTimeout(() => {
                const sortCycleValue = Math.floor(MAX_SORT_CYCLE_VALUE * this.resumePoint/this.history.length);
                this.goToState(i);
                this.setState({sortCycleValue: sortCycleValue});
                if (i === this.history.length - 1) { this.setState({animating: false}); }
            }, pauseTime);

            this.timeoutIDArray.push(timeoutID);
            count++;
        }
        this.setState({animating: true});
    }

    pause() {
        let i = 0;
        while (i < this.timeoutIDArray.length) {
            clearTimeout(this.timeoutIDArray[i++]);
        }
        this.timeoutIDArray = [];
        this.setState({animating: false});
    }

    reset() {
        this.pause();
        this.goToState(0);
    }

    resume() {
        if (!this.state.animating) {
            this.animateHistory(this.resumePoint);
        }
    }

    pauseResume() {
        if (this.state.animating) {
            this.pause();
        } else {
            this.resume();
        }
    }

    stepBackward() {
        this.pause();
        if (this.resumePoint > 0) { 
            this.goToState(this.resumePoint - 1);
        }
    }

    stepForward() {
        this.pause();
        this.goToState(this.resumePoint + 1);
    }

    generateArray(arrayType, arraySize) {
        if (!arraySize) arraySize = this.state.arraySize;
        this.pause();
        this.clearHistory();
        let array;
        switch (arrayType) {
            case RANDOM_ARRAY: array = generateRandomArray(arraySize, MIN_VALUE, MAX_VALUE); break;
            case STEADY_ARRAY: array = generateSteadyArray(arraySize, MIN_VALUE, MAX_VALUE); break;
            case SORTED_ARRAY: array = generateSortedArray(arraySize, MIN_VALUE, MAX_VALUE); break;
            case REVERSE_SORTED_ARRAY: array = generateReverseSortedArray(arraySize, MIN_VALUE, MAX_VALUE); break;
            case UNIFORM_ARRAY: array = generateUniformArray(arraySize, MIN_VALUE, MAX_VALUE); break;
            case PARTIAL_UNIFORM_ARRAY: array = generatePartialUniformArray(arraySize, MIN_VALUE, MAX_VALUE); break;
            default: array = []; break;
        }
        this.setState({
            array: array, 
            highlights: {}, 
            arraySize: arraySize, 
            arrayType: arrayType,
            disableSortCycleSlider: true
        });
        this.takeSnapshot(array, [], [], []);
        this.goToState(0);
    }

    changeSort(sortType){
        if (sortType === BOGO_SORT){
            this.generateArray(this.state.arrayType, BOGO_SORT_ARRAY_SIZE);
            this.setState({disableArraySizeSlider: true});
        } 
        else {
            if (this.state.disableArraySizeSlider) {
                this.generateArray(this.state.arrayType, MAX_ARRAY_SIZE);
                this.setState({disableArraySizeSlider: false});
            }
        }
        switch (sortType) {
            case BOGO_SORT: this.sort = bogoSort; break;
            case BUBBLE_SORT: this.sort = bubbleSort; break;
            case COCKTAIL_SORT: this.sort = cocktailShakerSort; break;
            case GNOME_SORT: this.sort = gnomeSort; break;
            case HEAP_SORT: this.sort = heapSort; break;
            case INSERTION_SORT: this.sort = insertionSort; break;
            case INTRO_SORT: this.sort = introSort; break;
            case MERGE_SORT: this.sort = mergeSort; break;
            case QUICK_SORT: this.sort = quickSort; break;
            case QUICK_SORT_OPTIMIZED: this.sort = quickSortOptimized; break;
            case SELECTION_SORT: this.sort = selectionSort; break;
            case SHELL_SORT: this.sort = shellSort; break;
            case TIM_SORT: this.sort = timSort; break;
            default: this.sort = introSort; break;
        }
    }

    changeColor(colorSet) {
        switch (colorSet) {
            case TOP_GLOW_COLOR_SET: this.setState({colorSet: colorSets.topGlow}); break;
            case BOTTOM_GLOW_COLOR_SET: this.setState({colorSet: colorSets.bottomGlow}); break;
            case SOLID_COLOR_SET: this.setState({colorSet: colorSets.solidColors}); break;
            case HIGH_CONTRAST_COLOR_SET: this.setState({colorSet: colorSets.highContrast}); break;
            default: break;
        }
    }

    onChangeArraySize(arraySize) {
        if (!this.state.animating) {
            if (this.state.arraySize !== arraySize) {
                this.generateArray(this.state.arrayType, arraySize);
            }
        } else {
            this.setState({arraySize: arraySize});
        }
    }

    onChangeSortSpeed(speed) {
        if (this.animationSpeed !== speed) {
            const percentageSpeed = speed/100;
            var pauseTime = MAX_ANIMATION_PAUSE - (ANIMATION_PAUSE_RANGE * percentageSpeed);
            this.animationSpeed = speed;
            this.animationPauseTime = pauseTime;

            if (this.state.animating) {
                this.pause();
                this.animateHistory(this.resumePoint);
            }
        }
    }

    onChangeSortCycle(step) {
        if (step !== this.state.sortCycleValue) {
            this.setState({sortCycleValue: step});
            this.pause();
            var resumePoint;
            if (step === 1) { 
                resumePoint = 0; 
            } else if (step === MAX_SORT_CYCLE_VALUE) { 
                resumePoint = this.history.length-1; 
            } else { 
                resumePoint = Math.round(this.history.length * step / MAX_SORT_CYCLE_VALUE); 
            }

            if (resumePoint !== this.resumePoint) {
                this.goToState(resumePoint);
            }
        }
    }

    render() {
        return (
            <div>
                <Controller 
                    onChangeArray = {this.generateArray} 
                    onChangeSort = {this.changeSort} 
                    onChangeColor = {this.changeColor} 
                    sort = {this.doSort} 
                    reset = {this.reset} 
                    pauseResume = {this.pauseResume} 
                    onChangeArraySize = {this.onChangeArraySize} 
                    onChangeSortSpeed = {this.onChangeSortSpeed} 
                    disableArraySizeSlider={this.state.disableArraySizeSlider} 
                />
                <HistoryManager
                    onChangeSortCycle = {this.onChangeSortCycle} 
                    stepForward={this.stepForward} 
                    stepBackward={this.stepBackward} 
                    sortCycleValue={this.state.sortCycleValue} 
                    disableSortCycleSlider={this.state.disableSortCycleSlider} 
                />

                <div className = {styles.arrayContainer}> 
                    <Array 
                        array={this.state.array} 
                        highlights={this.state.highlights}
                        colorSet={this.state.colorSet}
                    />
                </div>
                <div style = {{marginBottom: "5%"}}>
                    <Description header = "Description" description = "Lorem Ipsum bla bla..."/>
                    <Description header = "Complexity" description = "Lorem Ipsum bla bla..."/>
                    <Description header = "Founders & Fun Facts" description = "Lorem Ipsum bla bla..."/>
                </div>
                <Footer/>
            </div>
        );
    }
}
