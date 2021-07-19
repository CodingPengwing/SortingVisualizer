export function sort(props) {
    const sortedArray = heapSort(props.array, props.addToHistory);
    props.addToHistory({array: sortedArray.slice(), highlights: []});
    return sortedArray.slice();
}

function heapSort(array, addToHistory) {
    if (array.length <= 1) return array;

    // Add sentinel to top of list
    array.unshift(null);
    bottomUpHeapify(array, addToHistory);

    let heapSize = array.length;
    let arrayCopy;
    for (let i=array.length-1; i>0; i--) {
        // We have to remove the sentinel every time we add to history.
        // All the highlight indices have -1 because of the sentinel.
        arrayCopy = array.slice();
        arrayCopy.shift();
        addToHistory({array: arrayCopy, highlights: [1-1, i-1]});

        [array[1], array[i]] = [array[i], array[1]];

        arrayCopy = array.slice();
        arrayCopy.shift();
        addToHistory({array: arrayCopy, highlights: [1-1, i-1]});

        heapSize -= 1;
        maxHeapify(array, 1, heapSize, addToHistory);
    }

    // Remove the sentinel
    array.shift();
    return array;
}

// Turns the entire array into a heap
function bottomUpHeapify(array, addToHistory) {
    const n = array.length;
    const heapSize = n;
    for (let i=Math.floor(n/2); i>0; i--) {
        maxHeapify(array, i, heapSize, addToHistory);
    }
}

// Ensures that all elements related to index i satisfy the conditions of a heap.
function maxHeapify(array, i, heapSize, addToHistory) {
    // If this element has no children
    if (i*2 >= heapSize) return;

    let arrayCopy;
    let leftChild = 2*i;
    // rightChild = leftChild if this element only has one child
    let rightChild = (2*i+1 < heapSize) ? 2*i+1 : leftChild;

    // Remove the sentinel and add to history
    arrayCopy = array.slice();
    arrayCopy.shift();
    addToHistory({array: arrayCopy, highlights: [i-1, leftChild-1, rightChild-1]});

    let largest = i;
    // Find the largest element between the parent, left and right children.
    if (array[leftChild] > array[i]) {
        largest = leftChild;
    }
    if (array[rightChild] > array[largest]) {
        largest = rightChild;
    }

    // Swap elements if a child is bigger than the parent
    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];

        arrayCopy = array.slice();
        arrayCopy.shift();
        addToHistory({array: arrayCopy, highlights: [i-1, largest-1]});
        
        // Heapify again for the child's children
        maxHeapify(array, largest, heapSize, addToHistory);
    }
}
