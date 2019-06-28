// callback

const wcallback = (callback) =>{
    setTimeout(() => {
       callback(undefined,"this is result") 
    }, 2222);
}

wcallback((error,result) => {
    if (error){
        return console.log(error)
    }
    console.log(result)
})
