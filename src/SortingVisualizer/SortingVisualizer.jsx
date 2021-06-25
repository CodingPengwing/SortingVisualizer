import React from 'react';
// import ReactDOM from 'react-dom';
import * as mergeSort from '../sortingAlorithms/mergeSort';
import * as quickSort from '../sortingAlorithms/quickSort';
import './SortingVisualizer.css';



export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            highlights: [],
        };

        this.updateState = (array, highlights) => {
            this.setState({array: array, highlights: highlights});
        }
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i=0; i<200; i++) {
            array.push(randomIntFromInterval(5, 500));
        }
        // console.log(array.map((value, idx) => (value, idx)));
        // console.log(array);
        this.setState({array: array, highlights: []});
    }

    mergeSort() {
        const props = {
            array: this.state.array.slice(), 
            updateState: this.updateState
        }
        const sortedArray = mergeSort.sort(props);
        // TODO: Comment this out when implementing animation logic
        this.setState({array: sortedArray, highlights: []});
        return sortedArray;
    }

    quickSort() {
        const sortedArray = quickSort.sort(this.state.array, 0, this.state.array.length-1, this.updateState);
        // TODO: Comment this out when implementing animation logic
        this.setState({array: sortedArray, highlights: []});
        return sortedArray;
    }

    heapSort() {}

    bubbleSort() {}

    testSorts() {
        const trueSortedArray = this.state.array
            .slice()
            .sort((a, b) => a - b);
        // const mergeSortedArray = this.mergeSort();
        const quickSortedArray = this.quickSort();
        // const heapSortedArray = this.heapSort();
        // const bubbleSortedArray = this.bubbleSort();
        // console.log(arraysAreEqual(trueSortedArray, mergeSortedArray));
        console.log(arraysAreEqual(trueSortedArray, quickSortedArray));
        // console.log(arraysAreEqual(trueSortedArray, heapSortedArray));
        // console.log(arraysAreEqual(trueSortedArray, bubbleSortedArray));
    }

    renderComparison() {

    }

    renderArray() {
        const array = this.state.array;
        // console.log(array);
        return (
            <div>
                {array.map((value, idx) => {
                    let color = '#00a1c9';
                    if (this.state.highlights.includes(idx)) color = 'red';
                    return (
                        <div 
                            className="array-bar" 
                            key={idx}
                            style={{height: `${value}px`, backgroundColor: color}}>
                        </div>
                    );
                })}
            </div>
        );
    }
    

    render() {
        return (
            <div className="array-container">
                {this.renderArray()}
                <div>
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.testSorts()}>Test Sorts</button>
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
