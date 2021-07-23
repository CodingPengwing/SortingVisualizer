* Sorting Visualizer *

As the name suggests, this program is all about the sorting algorithms. We've chosen the most popular 
sorting algorithms to demonstrate: some simple algorithms, some more commonly used ones (the big 3 as we 
call it: merge, quick, heap), and some hybrid algorithms. In each case, we've kept the complexity of 
the algorithm to a minimum, meaning that there are many optimizations out there that have been published 
by a lot of smart people, but we've chosen to implement the very base version of the algorithms. This is
not because we are too incompetent at programming (or at least we hope so), but rather because people who
are not familiar with sorting algorithms would find simple visualizations a lot more helpful than complex
ones.

The following section assumes that you know how to code and know a bit of JavaScript/ReactJS (otherwise
we're not sure what you're doing reading this boring file). We recommend reading this while looking at 
some of the sorting algorithms to help you understand how we carry out animations for sorting. 

Here's how the code works:

- "SortingVisualizer" folder contains the components that are the main controllers of the program. 
"sortingAlgorithms" folder contain all the sorting algorithms that are implemented. "components" folder
contains components that are used to produce UI content and render animations.

SortingVisualizer folder:
- At the top of each file, there is a sort() function. This sort() function is like a common outward 
interface to adapt different kinds of algorithms into the same kind of function when used in another
component. To use the sorting algorithms, we can simply import them (as seen in the SortingVisualizer.jsx
and SortingTester.jsx files). 

- Each sort() function takes props (properties) as input. They all assume that props is a dictionary 
object containing an array and a function takeSnapshot(). takeSnapshot() is a function that records
the state of the array at each important step of the sorting, which is used later on to animate. 
Animations happen after the sorting algorithm has finished running, hence why we keep a history by using
take snapshot.

- takeSnapshot() takes 4 arguments as input:
  - array: the array we want to capture.
  - comparing: these are the indices that are being compared/swapped/overwritten.
  - locallySorted: these are the indices that are sorted compared to their local environment.
  - globallySorted: these are the indices that are in their final position once sorted.

- Then the sorting algorithms are executed as they usually would be, except, you'll notice that every
few lines of code, there will be a call to takeSnapshot(). This means that we think that the state of
the array here is worth showing to the user, because some important operation is being carried out. An
important operation can be anything like: comparing elements, swapping elements, moving elements, 
choosing a pivot, and so on... It is up to the programmer to decide what they want to show the user.

- You'll notice that sort() returns the sorted array. This is more for testing purposes, we don't 
actually need it for animations since we have already saved different states of the array into 
history as we executed the sorting.
