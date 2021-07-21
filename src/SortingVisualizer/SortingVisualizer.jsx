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

var MAX_ARRAY_SIZE = 100;
var ANIMATION_SPEED = 10;
var MIN_VALUE = 5;
var MAX_VALUE = 505;
const PRIMARY_COLOR = '#00a1c9';
const HIGHLIGHT_COLOR = '#832380';

function Bar(props) {
    var color = PRIMARY_COLOR;
    if (props.highlighted) {
        color = HIGHLIGHT_COLOR;
    }
    return (
        <div 
            className={styles.arrayBar} 
            key={props.idx}
            style={{height: `${props.value}px`, backgroundColor: color}}>
        </div>    
    );
}

class Array extends React.Component {
    renderBar(i) {
        let highlighted = this.props.highlights.includes(i);
        return (
            <Bar
                value={this.props.array[i]}
                idx={i}
                highlighted={highlighted}
                key={i}
            />
        )
    }

    render() {
        var bars = [];
        let i;
        for (i=0; i < this.props.array.length; i++) {
            bars.push(this.renderBar(i));
        }
        // Redundant invisible bar at the end of the array container
        // to maintain the height of the array container during animations
        bars.push(<div 
            className={styles.arrayBar}
            style={{height: MAX_VALUE + 30, backgroundColor: "black"}}
            key={i}
            >
        </div>)

        return (
            <div className={styles.array}>
                {bars}
            </div>
        )
    }
}

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            arraySize: MAX_ARRAY_SIZE,
            highlights: [],
            sort: quickSort,
            timeoutIDArray: [],
            resumePoint: 0,
            disableSlider: false,
            arrayState: STEADY_ARRAY,
        };

        this.history = [];

        this.addToHistory = (props) => {
            this.history.push({
                array: props.array.slice(), 
                highlights: props.highlights.slice()
            });
        };

        this.clearHistory = () => {
            this.history = [];
        }

        this.clearForwardHistory = () => {
            this.history = this.history.slice(0, this.state.resumePoint+1);
        }

        this.generateArray = this.generateArray.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.doSort = this.doSort.bind(this);
        this.reset = this.reset.bind(this);
        this.pause = this.pause.bind(this);
        this.onChangeArraySize = this.onChangeArraySize.bind(this);
        this.onChangeSortSpeed = this.onChangeSortSpeed.bind(this);
    }

    componentDidMount() {
        this.generateArray(STEADY_ARRAY);
        testSortingAlgorithms();
    }

    changeSort(sortType){
        if (sortType === BOGO_SORT){
            this.pause();
            this.setState({disableSlider: true});
            this.setState({arraySize: 7});
            this.generateArray(STEADY_ARRAY);
        } 
        else {
            if (this.state.disableSlider) {
                this.pause();
                this.setState({disableSlider: false});
                this.setState({arraySize: MAX_ARRAY_SIZE});
                this.generateArray(STEADY_ARRAY);
            }
        }

        switch (sortType) {
            case BOGO_SORT:
                this.setState({sort: bogoSort});
                break;
            case BUBBLE_SORT:
                this.setState({sort: bubbleSort});
                break;
            case COCKTAIL_SORT:
                this.setState({sort: cocktailShakerSort});
                break;
            case GNOME_SORT:
                this.setState({sort: gnomeSort});
                break;
            case HEAP_SORT:
                this.setState({sort: heapSort});
                break;
            case INSERTION_SORT:
                this.setState({sort: insertionSort});
                break;
            case INTRO_SORT:
                this.setState({sort: introSort});
                break;
            case MERGE_SORT:
                this.setState({sort: mergeSort});
                break;
            case QUICK_SORT:
                this.setState({sort: quickSort});
                break;
            case QUICK_SORT_OPTIMIZED:
                this.setState({sort: quickSortOptimized});
                break;
            case SELECTION_SORT:
                this.setState({sort: selectionSort});
                break;
            case SHELL_SORT:
                this.setState({sort: shellSort});
                break;
            case TIM_SORT:
                this.setState({sort: timSort});
                break;
            default:
                break;
        }
    }

    generateArray(arrayType) {
        this.pause();
        let array = [];
        const size = this.state.arraySize;
        switch (arrayType) {
            case RANDOM_ARRAY:
                array = generateRandomArray(size, MIN_VALUE, MAX_VALUE);
                break;
            case STEADY_ARRAY:
                array = generateSteadyArray(size, MIN_VALUE, MAX_VALUE);
                break;
            case SORTED_ARRAY:
                array = generateSortedArray(size, MIN_VALUE, MAX_VALUE);
                break;
            case REVERSE_SORTED_ARRAY:
                array = generateReverseSortedArray(size, MIN_VALUE, MAX_VALUE);
                break;
            case UNIFORM_ARRAY:
                array = generateUniformArray(size, MIN_VALUE, MAX_VALUE);
                break;
            case PARTIAL_UNIFORM_ARRAY:
                array = generatePartialUniformArray(size, MIN_VALUE, MAX_VALUE);
                break;
            default:
                break;
        }
        this.setState({array: array, highlights: []});
    }

    reset() {
        if (this.history.length > 0) {
            const originalArray = this.history[0].array.slice();
            this.pause();
            this.clearHistory();
            this.setState({array: originalArray, highlights: []});
        }
    }

    pause(){
        let arrLen = this.state.timeoutIDArray.length;
        for (let i=this.state.resumePoint; i < arrLen; i++){
            clearTimeout(this.state.timeoutIDArray[i]);
        }
    }

    animateHistory() {
        for (let i=0; i<this.history.length; i++) {
            let timeoutID = setTimeout(() => {this.setState({array: this.history[i].array, highlights: this.history[i].highlights, resumePoint: i})}, ANIMATION_SPEED*i);
            this.state.timeoutIDArray.push(timeoutID);
        }
    }

    doSort() {
        this.pause();
        // this.clearForwardHistory();
        this.clearHistory();
        this.state.sort({array: this.state.array, addToHistory: this.addToHistory});
        this.animateHistory();
    }

    onChangeArraySize(size, arrayType){
        if (this.state.arraySize !== size) {
            this.setState({arraySize: size});
            this.generateArray(arrayType);
        }
    }

    onChangeSortSpeed(speed) {
        if (ANIMATION_SPEED !== speed) {
            let percentageSpeed = speed / 100;
            ANIMATION_SPEED = 510 - (500 * percentageSpeed);
            this.pause();
            let count = 1;
            for (let i=this.state.resumePoint; i<this.history.length; i++){
                let timeoutID = setTimeout(() => {this.setState({array: this.history[i].array, highlights: this.history[i].highlights})}, ANIMATION_SPEED*count);
                this.state.timeoutIDArray.push(timeoutID);
                count++;
            }
        }
    }

    render() {
        return (
            <div>
                <Selector onChangeInput = {this.generateArray} onChangeSort = {this.changeSort} sort = {this.doSort}
                reset = {this.reset} pause = {this.pause} onChangeSize = {this.onChangeArraySize}
                onChangeSpeed = {this.onChangeSortSpeed} disableSlider={this.state.disableSlider}/>
                <div className = {styles.arrayContainer}>
                    <Array
                        array={this.state.array}
                        highlights={this.state.highlights}
                    />
                </div>
            </div>
        );
    }
}
