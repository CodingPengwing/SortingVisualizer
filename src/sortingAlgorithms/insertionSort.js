
// TODO: Implement Insertion Sort
export function sort(props) {
    const array = props.array;
    const [start, end] = props.range;
    // const end = props.range[1];
    const addToHistory = props.addToHistory;
    const arrayLength = end - start + 1;
    if (arrayLength <= 1) return array;
    
    for (let i=0; i<arrayLength; i++) {
        let j = i - 1;
        addToHistory({
            array: array.slice(), 
            highlights: [j, i]
        });
        while (j >= 0 && array[j+1] < array[j]) {
            addToHistory({
                array: array.slice(), 
                highlights: [j+1, j]
            });
            [array[j+1], array[j]] = [array[j], array[j+1]];
            addToHistory({
                array: array.slice(), 
                highlights: [j+1, j]
            });
            j -= 1;
            addToHistory({
                array: array.slice(), 
                highlights: []
            });
        }
        addToHistory({
            array: array.slice(), 
            highlights: []
        });
    }
    return array;
}
