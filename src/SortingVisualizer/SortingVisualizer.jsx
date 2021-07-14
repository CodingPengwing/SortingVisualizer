import React, { useEffect } from 'react';
// import ReactDOM from 'react-dom';
import * as mergeSort from '../sortingAlorithms/mergeSort';
import * as quickSort from '../sortingAlorithms/quickSort';
import './SortingVisualizer.css';

function Bar(props) {
    var color = '#00a1c9';
    if (props.highlighted === true) {
        color = '#930390';
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

        // // for testing
        // this.history = [{
        //     array: [500, 400, 300, 200, 100],
        //     highlights: [0, 4]
        // }, {
        //     array: [100, 400, 300, 200, 500],
        //     highlights: [0, 4]
        // }, {
        //     array: [100, 400, 300, 200, 500],
        //     highlights: []
        // }, {
        //     array: [100, 400, 300, 200, 500],
        //     highlights: [1, 3]
        // }, {
        //     array: [100, 200, 300, 400, 500],
        //     highlights: [1, 3]
        // }, {
        //     array: [100, 200, 300, 400, 500],
        //     highlights: []
        // }
        // ];

        this.updateState = (array, highlights) => {
            this.setState({array: array, highlights: highlights});
        };

        this.addToHistory = (props) => {
            this.history.put({
                array: props.array.slice(), 
                highlights: props.highlights.slice()
            })
        };

        this.clearHistory = () => {
            this.history = [];
        }
    }

    animateHistory() {
        // this.history.forEach();
        for (let i=0; i<this.history.length; i++) {
            setTimeout(() => {this.updateState(this.history[i].array, this.history[i].highlights)}, 500*i);
        }
    }

    componentDidMount() {
        // this.updateState(this.state.array, this.state.highlights);
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
        const sortedArray = quickSort.sort({
            state: this.state, 
            range: [0, this.state.array.length-1], 
            updateState: this.updateState,
            step: 0
        });
        // Comment this out when implementing animation logic
        // this.setState({array: sortedArray, highlights: []});
        return sortedArray;
    }

    // testSorts() {
    //     const trueSortedArray = this.state.array
    //         .slice()
    //         .sort((a, b) => a - b);
    //     const quickSortedArray = this.quickSort();
    //     console.log(arraysAreEqual(trueSortedArray, quickSortedArray));
    // }

    testAll() {
        setTimeout(() => this.updateState([500, 400, 300, 200, 100], [0, 4]), 1000);
        setTimeout(() => this.updateState([100, 400, 300, 200, 500], [0, 4]), 2000);
        setTimeout(() => this.updateState([100, 400, 300, 200, 500], []), 3000);
        setTimeout(() => this.updateState([100, 400, 300, 200, 500], [1, 3]), 4000);
        setTimeout(() => this.updateState([100, 200, 300, 400, 500], [1, 3]), 5000);
        setTimeout(() => this.updateState([100, 200, 300, 400, 500], []), 6000);
    }

    render() {
        return (
            <div className="array-container">
                <Array
                    array={this.state.array}
                    highlights={this.state.highlights}
                />
                <div className="buttons">
                    <button onClick={() => this.testAll()}>Test Animations</button>
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.animateHistory()}>Test history</button>
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

function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}
    