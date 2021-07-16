import React, { useEffect } from 'react';
// import ReactDOM from 'react-dom';
import * as mergeSort from '../sortingAlgorithms/mergeSort';
import * as insertionSort from '../sortingAlgorithms/insertionSort';
import * as quickSort from '../sortingAlgorithms/quickSort';
import { StyledButton } from '../components/NavBar';
import './SortingVisualizer.css';

const ARRAY_SIZE = 100;
const ANIMATION_SPEED = 100;
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

        this.originalArray = [];

        this.history = [];

        this.updateState = (array, highlights) => {
            this.setState({array: array, highlights: highlights});
        };

        this.addToHistory = (props) => {
            this.history.push({
                array: props.array.slice(), 
                highlights: props.highlights.slice()
            })
        };

        this.clearHistory = () => {
            this.history = [];
        }
    }

    componentDidMount() {
        this.generateRandomArray();
    }

    generateRandomArray() {
        const array = [];
        for (let i=0; i<ARRAY_SIZE; i++) {
            array.push(randomIntFromInterval(5, 500));
        }
        this.originalArray = array.slice();
        this.setState({array: array, highlights: []});
    }

    generateSortedArray() {
        this.generateRandomArray();
        this.originalArray = this.originalArray.slice().sort((a, b) => a - b);
        this.setState({array: this.originalArray, highlights: []});
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
            range: [0, this.state.array.length-1], 
            addToHistory: this.addToHistory,
            step: 0
        });

        this.animateHistory();
        return sortedArray;
    }

    insertionSort() {
        this.clearHistory();
        const sortedArray = insertionSort.sort({
            array: this.state.array, 
            range: [0, this.state.array.length-1], 
            addToHistory: this.addToHistory,
            step: 0
        });

        this.animateHistory();
        return sortedArray;
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
                    <StyledButton onClick={() => this.quickSort()}>Quick Sort</StyledButton>
                    <StyledButton onClick={() => this.mergeSort()}>Merge Sort</StyledButton>
                    <StyledButton onClick={() => this.insertionSort()}>Insertion Sort</StyledButton>
                </div>
            </div>
        );
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
