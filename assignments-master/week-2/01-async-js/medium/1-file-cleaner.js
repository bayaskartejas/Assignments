// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const { log } = require("console")
let fs = require("fs")
let wordsArr;
fs.readFile("textfile.txt", "utf-8", (err, data)=>{
    if(err){
        console.log(err);
        return
    }
    else{
          wordsArr = data.split(" ").filter(character => character !== "" ).join(" ")
          console.log(wordsArr)
    }
    fs.writeFile("textfile.txt", wordsArr,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("done2");
        }
    })
})