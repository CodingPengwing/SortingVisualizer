import React, { useEffect } from 'react';
// import ReactDOM from 'react-dom';
import * as mergeSort from '../sortingAlorithms/mergeSort';
import * as quickSort from '../sortingAlorithms/quickSort';
import './SortingVisualizer.css';

function Bar(props) {
    let color = '#00a1c9';
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
        const bars = [];
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


class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    // componentWillUnmount() {
    //   clearInterval(this.timerID);
    // }
  
    tick() {
      this.setState({
        date: new Date()
      });
      console.log("ticking");
    }
  
    render() {
      return (
        <div>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
}




export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [500, 400, 300, 200, 100],
            highlights: [],
        };

        this.updateState = (array, highlights) => {
            this.setState({array: array, highlights: highlights});
        }
    }

    componentDidMount() {
        this.updateState(this.state.array, this.state.highlights);
        // this.resetArray();
        // this.timerID = setInterval(
        //     () => this.tick(),
        //     100
        // );
    }

    tick() {
        this.updateState(this.state.array, this.state.highlights);
    }

    // resetArray() {
    //     const array = [];
    //     for (let i=0; i<200; i++) {
    //         array.push(randomIntFromInterval(5, 500));
    //     }
    //     // console.log(array);
    //     this.setState({array: array, highlights: []});
    // }

    quickSort() {
        const sortedArray = quickSort.sort(this.state.array, 0, this.state.array.length-1, this.updateState);
        // Comment this out when implementing animation logic
        this.setState({array: sortedArray, highlights: []});
        return sortedArray;
    }

    // testSorts() {
    //     const trueSortedArray = this.state.array
    //         .slice()
    //         .sort((a, b) => a - b);
    //     const quickSortedArray = this.quickSort();
    //     console.log(arraysAreEqual(trueSortedArray, quickSortedArray));
    // }

    test1() {
        this.updateState([500, 400, 300, 200, 100], [0, 4]);
    }

    test2() {
        this.updateState([100, 400, 300, 200, 500], [0, 4]);
    }

    test3() {
        this.updateState([100, 400, 300, 200, 500], []);
    }

    test4() {
        this.updateState([100, 400, 300, 200, 500], [1, 3]);
    }

    test5() {
        this.updateState([100, 200, 300, 400, 500], [1, 3]);
    }

    test6() {
        this.updateState([100, 200, 300, 400, 500], []);
    }

    testAll() {
        setTimeout(() => this.test1(), 1000);
        setTimeout(() => this.test2(), 2000);
        setTimeout(() => this.test3(), 3000);
        setTimeout(() => this.test4(), 4000);
        setTimeout(() => this.test5(), 5000);
        setTimeout(() => this.test6(), 6000);
    }

    render() {
        return (
            <div className="array-container">
                <Array
                    array={this.state.array}
                    highlights={this.state.highlights}
                />
                <Clock/>
                <div className="buttons">
                    <button onClick={() => this.test1()}>Test</button>
                    <button onClick={() => this.test2()}>Test</button>
                    <button onClick={() => this.test3()}>Test</button>
                    <button onClick={() => this.test4()}>Test</button>
                    <button onClick={() => this.test5()}>Test</button>
                    <button onClick={() => this.test6()}>Test</button>
                    <button onClick={() => this.testAll()}>Test All</button>
                </div>
            </div>
        );
    }
}












// {
//     /* <button onClick={() => this.resetArray()}>Generate New Array</button>
//     <button onClick={() => this.mergeSort()}>Merge Sort</button>
//     <button onClick={() => this.quickSort()}>Quick Sort</button>
//     <button onClick={() => this.heapSort()}>Heap Sort</button>
//     <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
//     <button onClick={() => this.testSorts()}>Test Sorts</button> */}


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
    