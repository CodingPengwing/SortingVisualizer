// TODO: Implement animation logic
export function sort(props) {
    const array = props.array;
    
    if (array.length <= 1) return array;
    const halfway = Math.floor(array.length / 2);
    const left = sort({array: array.slice(0, halfway), updateState: props.updateState});
    const right = sort({array: array.slice(halfway), updateState: props.updateState});
    let i = 0, j = 0;
    let merge = [];
    while (i < left.length && j < right.length) {
        // console.log(props);
        props.updateState(array, [i, j]);
        // props.updateState({array: array, highlights: [i, j]});
        if (left[i] <= right[j]) {
            merge.push(left[i++]);
        } else {
            merge.push(right[j++]);
        }
    }
    while (i < left.length) merge.push(left[i++]);
    while (j < right.length) merge.push(right[j++]);
    return merge;
}


// In-place merge sort
// Code borrowed from https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial.git

// export function getMergeSortAnimations(array) {
//     // const animations = [];
//     if (array.length <= 1) return array;
//     const auxiliaryArray = array.slice();
//     mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
//     return animations;
//   }
  
//   function mergeSortHelper(
//     mainArray,
//     startIdx,
//     endIdx,
//     auxiliaryArray,
//     animations,
//   ) {
//     if (startIdx === endIdx) return;
//     const middleIdx = Math.floor((startIdx + endIdx) / 2);
//     mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
//     mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
//     doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
//   }
  
//   function doMerge(
//     mainArray,
//     startIdx,
//     middleIdx,
//     endIdx,
//     auxiliaryArray,
//     animations,
//   ) {
//     let k = startIdx;
//     let i = startIdx;
//     let j = middleIdx + 1;
//     while (i <= middleIdx && j <= endIdx) {
//       // These are the values that we're comparing; we push them once
//       // to change their color.
//       animations.push([i, j]);
//       // These are the values that we're comparing; we push them a second
//       // time to revert their color.
//       animations.push([i, j]);
//       if (auxiliaryArray[i] <= auxiliaryArray[j]) {
//         // We overwrite the value at index k in the original array with the
//         // value at index i in the auxiliary array.
//         animations.push([k, auxiliaryArray[i]]);
//         mainArray[k++] = auxiliaryArray[i++];
//       } else {
//         // We overwrite the value at index k in the original array with the
//         // value at index j in the auxiliary array.
//         animations.push([k, auxiliaryArray[j]]);
//         mainArray[k++] = auxiliaryArray[j++];
//       }
//     }
//     while (i <= middleIdx) {
//       // These are the values that we're comparing; we push them once
//       // to change their color.
//       animations.push([i, i]);
//       // These are the values that we're comparing; we push them a second
//       // time to revert their color.
//       animations.push([i, i]);
//       // We overwrite the value at index k in the original array with the
//       // value at index i in the auxiliary array.
//       animations.push([k, auxiliaryArray[i]]);
//       mainArray[k++] = auxiliaryArray[i++];
//     }
//     while (j <= endIdx) {
//       // These are the values that we're comparing; we push them once
//       // to change their color.
//       animations.push([j, j]);
//       // These are the values that we're comparing; we push them a second
//       // time to revert their color.
//       animations.push([j, j]);
//       // We overwrite the value at index k in the original array with the
//       // value at index j in the auxiliary array.
//       animations.push([k, auxiliaryArray[j]]);
//       mainArray[k++] = auxiliaryArray[j++];
//     }
//   }
