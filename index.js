
class MyPromise {
    constructor(executor) {
        this.executor = executor;
        this.state = 'pending';
        this.result = null;
        this.fullfilledHandlers = [];
        this.rejectedHandlers = [];
        
        this.resolve = (value) => {
            console.log("ffff");
            this.state = "fullfiled";
            this.result = value;
            this.fullfilledHandlers.forEach(handler => {
                
                handler(this.result)
            } );
            
        };

        this.reject = (error) => {
            console.log("reject");
            this.state = "rejected";
            this.result = error;
            this.rejectedHandlers.forEach((handler) => handler(this.result));
            
        }


       
            this.executor(this.resolve, this.reject);
        
    }

    then(onFullfiled, onReject) {
        return new MyPromise((resolve, reject) => {
            if(this.state === "pending") {
                if(typeof onFullfiled === 'function') {
                    this.fullfilledHandlers.push(() => {
                        console.log("ttttttttjhkjhkjh")
                        let valueFromLastPromise = onFullfiled(this.result);
                        resolve(valueFromLastPromise);
                    } );
                    
                } 
    
                if (typeof onReject === 'function') {
                    try {
                        this.rejectedHandlers.push(() => {
                            let valueFromLastPromise = onReject(this.result);
                            reject(valueFromLastPromise);
                        });
                    } catch (err) {
                        reject(err);
                    }
                    
                }
                
            }

            if (this.state === "fullfiled") {
                let asd = onFullfiled(this.result);
                resolve(asd);
            }

            if (this.state === "rejected") {
                let asd = onReject(this.result);
                reject(asd);
            }
            console.log(this.rejectedHandlers,";;;;;;")
        }) 
    }

    catch(onReject) {
        return new MyPromise((resolve, reject) => {
            if(this.state === "pending") {
                if (typeof onReject === 'function') {
                    try {
                        this.rejectedHandlers.push(() => {
                            let valueFromLastPromise = onReject(this.result);
                            reject(valueFromLastPromise);
                        });
                    } catch (err) {
                        reject(err);
                    }
                    
                }
                
            }

            if (this.state === "rejected") {
                let asd = onReject(this.result);
                reject(asd);
            }
            console.log(this.rejectedHandlers,";;;;;;")
        }) 
    }
    

}

function ajax(url, configs = {}) {
    
    const xhr = XMLHttpRequest();
    xhr.open()
}


const myPromise = new MyPromise((r, rej) => {
    setTimeout(() => {
        rej(new Error("ff"));
    }, 2000);
    
    console.log(123)
});

myPromise.then((val) => {
    // throw new Error("dddd")
    console.log(val,"rrrr");
    console.log(myPromise);

    return val + "f";
}).then((val) => {
    console.log(val);
    console.log(myPromise);

    return val + "f";
    
}).then((val) => {
    console.log(val);
    console.log(val + "f");
    console.log(myPromise);
}).catch((err) => {
    console.log(err,"aaa")
})



