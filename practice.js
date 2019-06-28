//  promises

const add = (a,b) => {
    return new Promise((resolve, reject)=>{
            resolve(a+b)
    })
}


add(1,2).then((sum) => {
    console.log(sum)
    return add(sum,3).then((sum2)=>{
        console.log(sum2)
    })
}).catch((e) =>{
    console.log(e)
})