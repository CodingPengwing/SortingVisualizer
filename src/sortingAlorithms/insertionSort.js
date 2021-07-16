// TODO: Implement Insertion Sort

export function sort(array) {
    for (let i=0; i<array.length; i++) {
        let j = i - 1;
        while (j >= 0 && array[j+1] < array[j]) {
            [array[j+1], array[j]] = [array[j], array[j+1]];
            j -= 1;
        }
    }
    return array;
}
