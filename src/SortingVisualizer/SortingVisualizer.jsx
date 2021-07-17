import React from 'react';

import * as tester from '../sortingAlgorithms/SortingTester';
import * as mergeSort from '../sortingAlgorithms/mergeSort';
import * as insertionSort from '../sortingAlgorithms/insertionSort';
import * as quickSort from '../sortingAlgorithms/quickSort';
import * as heapSort from '../sortingAlgorithms/heapSort';
import { StyledButton } from '../components/NavBar';
import './SortingVisualizer.css';

const ARRAY_SIZE = 100;
const ANIMATION_SPEED = 500;
const MIN_VALUE = 5;
const MAX_VALUE = 500;
const PRIMARY_COLOR = '#00a1c9';
const HIGHLIGHT_COLOR = '#832380';

function Bar(props) {
    var color = PRIMARY_COLOR;
    if (props.highlighted === true) {
        color = HIGHLIGHT_COLOR;
    }
    return (
        <div 
            className="array-bar" 
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
        for (let i=0; i < this.props.array.length; i++) {
            bars.push(this.renderBar(i));
        }

        return (
            <div className="array">
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
        };

        this.history = [];

        this.updateState = (array, highlights) => {
            this.setState({array: array, highlights: highlights});
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

    generateRandomArray() {
        const array = this.randomArray();
        this.updateState(array.slice(), []);
        console.log(this.state.array);
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

    reset() {
        if (this.history.length > 0) {
            const firstState = this.history[0];
            this.updateState(firstState.array.slice(), []);
        }
        this.clearHistory();
    }

    animateHistory() {
        for (let i=0; i<this.history.length; i++) {
            setTimeout(() => {this.updateState(this.history[i].array, this.history[i].highlights)}, ANIMATION_SPEED*i);
        }
    }

    quickSort() {
        this.clearHistory();
        const sortedArray = quickSort.sort({
            array: this.state.array, 
            addToHistory: this.addToHistory
        });

        this.animateHistory();
        return sortedArray.slice();
    }

    mergeSort() {
        this.clearHistory();
        const sortedArray = mergeSort.sort({
            array: this.state.array, 
            addToHistory: this.addToHistory
        });

        this.animateHistory();
        return sortedArray.slice();
    }

    heapSort() {
        this.clearHistory();
        const sortedArray = heapSort.sort({
            array: this.state.array, 
            addToHistory: this.addToHistory
        });

        this.animateHistory();
        return sortedArray.slice();
    }

    insertionSort() {
        this.clearHistory();
        const sortedArray = insertionSort.sort({
            array: this.state.array, 
            addToHistory: this.addToHistory
        });

        this.animateHistory();
        return sortedArray;
    }

    test() {
        tester.testSortingAlgorithms();
    }

    render() {
        return (
            <div className="array-container">
                <Array
                    array={this.state.array}
                    highlights={this.state.highlights}
                />
                <div className="buttons">
                    <StyledButton onClick={() => this.generateRandomArray()}>Generate Random Array</StyledButton>
                    <StyledButton onClick={() => this.generateSortedArray()}>Generate Sorted Array</StyledButton>
                    <StyledButton onClick={() => this.generateReverseSortedArray()}>Generate Reverse Sorted Array</StyledButton>
                    <StyledButton onClick={() => this.reset()}>Reset</StyledButton>
                    <StyledButton onClick={() => this.quickSort()}>Quick Sort</StyledButton>
                    <StyledButton onClick={() => this.mergeSort()}>Merge Sort</StyledButton>
                    <StyledButton onClick={() => this.heapSort()}>Heap Sort</StyledButton>
                    <StyledButton onClick={() => this.insertionSort()}>Insertion Sort</StyledButton>
                    <StyledButton onClick={() => this.test()}>Run Tests</StyledButton>
                </div>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}
