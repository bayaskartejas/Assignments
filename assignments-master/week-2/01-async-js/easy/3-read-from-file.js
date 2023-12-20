// ## Reading the contents of a file

// Write code to read contents of a file and print it to the console. 
// You can use the fs library to as a black box, the goal is to understand async tasks. 
// Try to do an expensive operation below the file read and see how it affects the output. 
// Make the expensive operation more and more expensive and see how it affects the output. 

const { log } = require("console");
const fs = require("fs")
const promise = 
    new Promise((resolve, reject)=>{
    fs.readFile("file.txt", "utf-8", (err, data)=>{
        if(err){
            console.log(err);
            return
        }
        resolve(data)
    })
})

promise.then((data)=>{
    console.log("----- using .then -----");    
    console.log(data)
    let sum=0

    for(let i=0; i<1000000000; i++){
        sum = sum+i;
    }
    console.log(sum);
})

async function thenFunction(){
    let response = await promise
    console.log("----- using await -----");
    console.log(response);
    let sum=0
    for(let i=0; i<1000000000; i++){
        sum = sum+i;
    }
    console.log(sum);
}

thenFunction()
