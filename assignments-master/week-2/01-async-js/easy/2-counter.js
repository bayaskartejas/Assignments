let count
function startCounter(){
    count=0;
    incrementCount();
}
function incrementCount(){
    count++;
    console.log(count)
    setTimeout(incrementCount,1000)
}
startCounter();