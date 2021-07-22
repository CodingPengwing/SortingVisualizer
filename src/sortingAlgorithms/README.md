* Sorting Algorithms *

As the name suggests, this folder is all about the sorting algorithms. We've chosen the most popular 
sorting algorithms to include: some simple algorithms, some more commonly used ones (the big 3 as we 
call it: merge, quick, heap), and some hybrid algorithms. In each case, we've kept the complexity of 
the algorithm to a minimum, meaning that there are many optimizations out there that have been published 
by a lot of smart people, but we've chosen to implement the very base version of the algorithms. This 
decision is because anyone who has wrapped their heads around basic sorting algorithms should look into 
optimizations themselves by reading up online (there's no way we can include all of them... even if we 
tried). And anyone who has not yet wrapped their heads around basic sorting algorithms should not look
into optimizations, this demographic would make the most use of the visualizations.

The following section assumes that you know how to code and know a bit of JavaScript/ReactJS. We 
recommend reading this while looking at some of the sorting algorithms to help you understand how we 
carry out animations for sorting. This section also assumes that you somewhat understand sorting 
algorithms, otherwise... look at the website first (and go code some sorting algorithms to get familiar).

Here's how the code works:

- At the top of each file, there is a sort() function. This sort() function is like a common outward 
interface to adapt different kinds of algorithms into the same kind of function when used in another
component. To use the sorting algorithms, we can simply import them (as seen in the SortingVisualizer
component). 

- Each sort() function takes props (properties) as input. They all assume that props is a dictionary 
object containing an array and a function addToHistory(). addToHistory() is a function that records
the state of the array at each important step of the sorting, which is used later on to animate. 
Animations happen after the sorting algorithm has finished running. This means that we can't just pass
the array we're sorting into the addToHistory() function, rather, we have to pass a copy of the array
at the state that we want to record, otherwise, the animations will show a sorted array at every step 
(since the original array has been sorted by the time we start animations). If the previous sentence 
confuses you, read up on JavaScript object references. 

- .slice() is used to make a copy of the array, which is passed into addToHistory().

- addToHistory() takes its own props (properties) as input. A props for addToHistory() would include 
a copy of the array ( array: array.slice() ) and the sections we want to highlight ( highlights: ... ).

- Then the sorting algorithms are executed as they usually would be, except, you'll notice that every
few lines of code, there will be a call to addToHistory(). This means that we think that the state of
the array here is worth showing to the user, because some important operation is being carried out. An
important operation can be anything like: comparing elements, swapping elements, moving elements, 
choosing a pivot, and so on... It is up to the programmer to decide what they want to show the user.

- You'll notice that sort() returns a copy of the sorted array. This is more for testing purposes, we 
don't actually need it for animations since we have already saved different states of the array into 
history as we executed the sorting.
