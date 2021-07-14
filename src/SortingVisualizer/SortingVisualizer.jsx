import React, { useEffect } from 'react';
// import ReactDOM from 'react-dom';
import * as mergeSort from '../sortingAlorithms/mergeSort';
import * as quickSort from '../sortingAlorithms/quickSort';
import { StyledButton } from '../components/NavBar';
import './SortingVisualizer.css';

const ANIMATION_SPEED = 50;
const PRIMARY_COLOR = '#00a1c9';
const HIGHLIGHT_COLOR = '#930390';

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
            })
        };

        this.clearHistory = () => {
            this.history = [];
        }
    }

    animateHistory() {
        for (let i=0; i<this.history.length; i++) {
            setTimeout(() => {this.updateState(this.history[i].array, this.history[i].highlights)}, ANIMATION_SPEED*i);
        }
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i=0; i<100; i++) {
            array.push(randomIntFromInterval(5, 500));
        }
        this.setState({array: array, highlights: []});
    }

    quickSort() {
        this.clearHistory();
        const sortedArray = quickSort.sort({
            state: this.state, 
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
                    <StyledButton onClick={() => this.resetArray()}>Generate New Array</StyledButton>
                    <StyledButton onClick={() => this.quickSort()}>Quick Sort</StyledButton>
                    <StyledButton onClick={() => this.mergeSort()}>Merge Sort</StyledButton>
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
