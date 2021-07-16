
// TODO: Implement Insertion Sort
export function sort(props) {
    const array = props.array;
    const start = props.start;
    const end = props.end;
    const addToHistory = props.addToHistory;
    const arrayLength = end - start;
    if (arrayLength <= 1) return array;
    
    for (let i=0; i<arrayLength; i++) {
        let j = i - 1;
        while (j >= 0 && array[j+1] < array[j]) {
            [array[j+1], array[j]] = [array[j], array[j+1]];
            j -= 1;
        }
    }
    return array;
}
