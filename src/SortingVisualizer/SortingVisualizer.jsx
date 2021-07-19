import React from 'react';

import { randomIntFromInterval, range, shuffle } from '../sortingAlgorithms/util';
// import { testSortingAlgorithms } from '../sortingAlgorithms/SortingTester';
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

var ARRAY_SIZE = 100;
var ANIMATION_SPEED = 10;
const MIN_VALUE = 5;
const MAX_VALUE = 450;
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
        // Done to maintain the height of the array container
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
            highlights: [],
            sortType: quickSort,
            timeoutIDArray: [],
            resumePoint: 0,
            disableSlider: false,
            arrayState: "Steady",
        };

        this.history = [];

        this.updateState = (array, highlights, resumePoint) => {
            this.setState({array: array, highlights: highlights, resumePoint: resumePoint});
        };

        this.addToHistory = (props) => {
            this.history.push({
                array: props.array.slice(), 
                highlights: props.highlights.slice()
            });
        };

        this.clearHistory = () => {
            this.history = [];
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
        this.generateSteadyArray();
    }

    changeSort(sortType){
        if (sortType === "Bogo Sort"){
            this.pause();
            this.setState({disableSlider: true});
            ARRAY_SIZE = 7;
            this.generateSteadyArray();
        } 
        else {
            if (this.state.disableSlider) {
                this.setState({disableSlider: false});
                ARRAY_SIZE = 100;
                this.generateSteadyArray();
            }
        }

        switch (sortType) {
            case "Bogo Sort":
                this.setState({sortType: bogoSort});
                break;
            case "Bubble Sort":
                this.setState({sortType: bubbleSort});
                break;
            case "Cocktail Shaker Sort":
                this.setState({sortType: cocktailShakerSort});
                break;
            case "Gnome Sort":
                this.setState({sortType: gnomeSort});
                break;
            case "Heap Sort":
                this.setState({sortType: heapSort});
                break;
            case "Insertion Sort":
                this.setState({sortType: insertionSort});
                break;
            case "Intro Sort":
                this.setState({sortType: introSort});
                break;
            case "Merge Sort":
                this.setState({sortType: mergeSort});
                break;
            case "Quick Sort":
                this.setState({sortType: quickSort});
                break;
            case "Quick Sort Optimized":
                this.setState({sortType: quickSortOptimized});
                break;
            case "Selection Sort":
                this.setState({sortType: selectionSort});
                break;
            case "Shell Sort":
                this.setState({sortType: shellSort});
                break;
            case "Tim Sort":
                this.setState({sortType: timSort});
                break;
            default:
                break;
        }
    }

    generateArray(arrayType) {
        this.pause();
        switch (arrayType) {
            case "Random":
                this.generateRandomArray();
                break;
            case "Steady Random":
                this.generateSteadyArray();
                break;
            case "Sorted":
                this.generateSortedArray();
                break;
            case "Reverse Sorted":
                this.generateReverseSortedArray();
                break;
            case "Uniform":
                this.generateUniformArray();
                break;
            case "Partial Uniform":
                this.generatePartialUniformArray();
                break;
            default:
                break;
        }
    }

    generateRandomArray() {
        const gap = Math.floor((MAX_VALUE - MIN_VALUE) / ARRAY_SIZE);

        const array = [];
        for (let i=0; i < ARRAY_SIZE; i++) {
            array.push(MIN_VALUE + gap * randomIntFromInterval(0, Math.floor(MAX_VALUE/gap)));
        }

        this.updateState(array.slice(), []);
    }

    generateSteadyArray() {
        const gap = Math.floor((MAX_VALUE - MIN_VALUE) / ARRAY_SIZE);
        const multipliers = range(0, ARRAY_SIZE);
        shuffle(multipliers);
        const array = [];
        for (let i = 0; i < multipliers.length; i++) {
            array.push(MIN_VALUE + gap * multipliers[i]);
        }
        this.updateState(array.slice(), []);
    }

    generateSortedArray() {
        const gap = Math.floor((MAX_VALUE - MIN_VALUE) / ARRAY_SIZE);
        const array = [];
        for (let i = 0; i < ARRAY_SIZE; i++) {
            array.push(MIN_VALUE + gap * i);
        }
        this.updateState(array.slice(), []);
    }

    generateReverseSortedArray() {
        const gap = Math.floor((MAX_VALUE - MIN_VALUE) / ARRAY_SIZE);
        const array = [];
        for (let i = ARRAY_SIZE - 1; i >= 0; i--) {
            array.push(MIN_VALUE + gap * i);
        }
        this.updateState(array.slice(), []);
    }

    generateUniformArray() {
        const value = randomIntFromInterval(Math.floor(MAX_VALUE/2), MAX_VALUE);
        const array = [];
        for (let i = 0; i < ARRAY_SIZE; i++) { 
            array[i] = value; 
        }
        this.updateState(array.slice(), []);
    }

    generatePartialUniformArray() {
        const diffValues = 5;
        const gap = Math.floor((MAX_VALUE - MIN_VALUE) / diffValues);
        const values = [];
        for (let i = 1; i <= diffValues; i++) {
            values.push(MIN_VALUE + i * gap);
        }

        const array = [];
        for (let i = 0; i < diffValues; i++) {
            for (let j = 0; j < Math.floor(ARRAY_SIZE/diffValues); j++) {
                array.push(MIN_VALUE + values[i]);
            }
        }

        while (array.length < ARRAY_SIZE) {
            array.push(MIN_VALUE + values[randomIntFromInterval(0, 4)]);
        }
        shuffle(array);
        this.updateState(array.slice(), []);
    }

    reset() {
        if (this.history.length > 0) {
            const firstState = this.history[0];
            this.updateState(firstState.array.slice(), []);
        }
        this.pause();
        this.clearHistory();
    }

    pause(){
        let arrLen = this.state.timeoutIDArray.length;
        for (let i=this.state.resumePoint; i < arrLen; i++){
            clearTimeout(this.state.timeoutIDArray[i]);
        }
    }

    animateHistory() {
        for (let i=0; i<this.history.length; i++) {
            let timeoutID = setTimeout(() => {this.updateState(this.history[i].array, this.history[i].highlights, i)}, ANIMATION_SPEED*i);
            this.state.timeoutIDArray.push(timeoutID);
        }
    }

    doSort() {
        this.clearHistory();
        const sortedArray = this.state.sortType({
            array: this.state.array, 
            addToHistory: this.addToHistory
        });

        this.animateHistory();
        return sortedArray.slice();
    }

    onChangeArraySize(size, arrayType){
        if (ARRAY_SIZE !== size) {
            ARRAY_SIZE = size;
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
                let timeoutID = setTimeout(() => {this.updateState(this.history[i].array, this.history[i].highlights, i)}, ANIMATION_SPEED*count);
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
                {/*<div className={styles.buttons}>
                    <StyledButton onClick={() => this.test()}>Run Tests</StyledButton>
                </div>*/}
            </div>
        );
    }
}
