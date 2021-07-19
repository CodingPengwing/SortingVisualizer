import React from 'react';

import * as tester from '../sortingAlgorithms/SortingTester';
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

import { StyledButton } from '../components/NavBar';
import { Selector } from '../components/SortingSelector';
import styles from './SortingVisualizer.module.scss';

var ARRAY_SIZE = 100;
var ANIMATION_SPEED = 10;
const MIN_VALUE = 5;
const MAX_VALUE = 500;
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
            style={{height: 530, backgroundColor: "black"}}
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
            sortType: insertionSort,
            timeoutIDArray: [],
            resumePoint: 0,
            disableSlider: false,
            arrayState: "random",
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

        this.changeInput = this.changeInput.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.doSort = this.doSort.bind(this);
        this.reset = this.reset.bind(this);
        this.pause = this.pause.bind(this);
        this.onChangeArraySize = this.onChangeArraySize.bind(this);
        this.onChangeSortSpeed = this.onChangeSortSpeed.bind(this);
    }

    componentDidMount() {
        this.generateRandomArray();
    }

    randomArray() {
        const array = [];
        for (let i=0; i<ARRAY_SIZE; i++) {
            array.push(randomIntFromInterval(MIN_VALUE, MAX_VALUE));
        }
        return array.slice();
    }

    changeInput(inputType){
        switch (inputType) {
            case "Random":
                this.generateRandomArray();
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

    changeSort(sortType){
        if (sortType === "Bogo Sort"){
            this.setState({disableSlider: true});
            ARRAY_SIZE = 7;
            this.generateRandomArray();
        } 
        else {
            if (this.state.disableSlider) {
                this.setState({disableSlider: false});
                ARRAY_SIZE = 100;
                this.generateRandomArray();
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

    generateRandomArray() {
        const array = this.randomArray();
        this.updateState(array.slice(), []);
    }

    generateSortedArray() {
        const array = this.randomArray();
        const sortedArray = array.sort((a, b) => a - b);
        this.updateState(sortedArray.slice(), []);
    }

    generateReverseSortedArray() {
        const array = this.randomArray();
        const reverseSortedArray = array.sort((a, b) => b - a);
        this.updateState(reverseSortedArray.slice(), []);
    }

    generateUniformArray() {
        const value = randomIntFromInterval(MIN_VALUE, MAX_VALUE);
        const array = [];
        for (let i = 0; i < ARRAY_SIZE; i++) { 
            array[i] = value; 
        }
        this.updateState(array.slice(), []);
    }

    generatePartialUniformArray() {
        const values = [];
        for (let i = 0; i < 5; i++) {
            values.push(randomIntFromInterval(MIN_VALUE, MAX_VALUE));
        }

        const array = [];
        for (let i = 0; i < ARRAY_SIZE; i++) { 
            array[i] = values[randomIntFromInterval(0, 4)]; 
        }
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

    test() {
        tester.testSortingAlgorithms();
    }

    onChangeArraySize(size, arrayType){
        if (ARRAY_SIZE !== size) {
            ARRAY_SIZE = size;
            switch (arrayType) {
                case "Random":
                    this.generateRandomArray();
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
            }
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
                <Selector onChangeInput = {this.changeInput} onChangeSort = {this.changeSort} sort = {this.doSort}
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

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}
