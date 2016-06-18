
/**
 * Promises/A+ 的简单实现
 */


// 状态机
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;

function Promise(fn) {
  // store state which can be PENDING, FULFILLED or REJECTED
  var state = PENDING;

  // store value or error once FULFILLED or REJECTED
  var value = null;

  // store sucess & failure handlers attached by calling .then or .done
  var handlers = [];


  //////////////
  // 状态改变 //
  //////////////
  function fulfill(result){
    state = FULFILLED;
    value = result;
  }

  function reject(error){
    state = REJECTED;
    value = error;
  }

  function resolve(result){
    try {
        var then = getThen(result);
        if(then){
            doResolve(then.bind(result), resolve, reject);
            return;
        }
        fulfill(result);
    } catch (e) {
        console.log('{resolve},', e);
        reject(e);
    }
  }

  /***************************************
   * resolve 方法可以接受一个普通值或者另一个 promise 作为参数，
   * 如果接受一个 promise 作为参数，等待其完成。 
   * promise 不允许被另一个 promise fulfill ，所以需要开放 resolve 方法。 
   * resolve 方法依赖一些帮助方法定义如下:
   ******************************************/

   /**
    * Check if a value is a Promise and, if it is,
    * return the `then` method of that promise.
    *
    * @param {Promise|Any} value
    * @return {Function|Null}
    */
   function getThen(value) {
     var t = typeof value;
     if (value && (t === 'object' || t === 'function')) {
       var then = value.then;
       if (typeof then === 'function') {
         return then;
       }
     }
     return null;
   }

   /**
    * Take a potentially misbehaving resolver function and make sure
    * onFulfilled and onRejected are only called once.
    *
    * Makes no guarantees about asynchrony.
    *
    * @param {Function} fn A resolver function that may not be trusted
    * @param {Function} onFulfilled
    * @param {Function} onRejected
    */
    function doResolve(fn, onFulfilled, onRejected) {
        var done = false;
        console.log('{doResolve},fn:',done, fn, onFulfilled, onRejected);
        console.log('---------------------------------------');
        try {
            fn(function(value) {
                if(done) return;

                done = true;
                onFulfilled(value);
            }, function(reason) {
                if(done) return;

                done = true;
                onRejected(reason);
            });
        } catch (err) {
            if(done) return;

            done = true;
            onRejected(err);
        }  
    }

    // 构造器
    //function Promise(fn) {
        //console.log(11111111,fn);return;
        // ...
        doResolve(fn, resolve, reject);


        function handle(handler){
            if(state === PENDING){
                handlers.push(handler);
                return;
            }

            if(state === FULFILLED &&
                typeof handler.onFulfilled === 'function'){
                handler.onFulfilled(value);
            }
            if (state === REJECTED &&
                typeof handler.onRejected === 'function') {
                handler.onRejected(value);
            }
        }

        // .done 方法
        this.done = function(onFulfilled, onRejected){
            setTimeout(function() {
                handle({
                    onFulfilled: onFulfilled,
                    onRejected: onRejected,
                });
            }, 0);
        }

        // .then 方法
        this.then = function(onFulfilled, onRejected){
            var self = this;
            return new Promise(function(resolve, reject) {
                return self.done(function(result) {
                    if(typeof onFulfilled === 'function'){
                        try {
                            return resolve(onFulfilled(result));
                        } catch (e) {
                            return reject(e);
                        }
                    } else {
                        return resolve(result);
                    }
                }, function(error) {
                    if(typeof onRejected === 'function'){
                        try {
                            return resolve(onRejected(result));
                        } catch (e) {
                            return reject(e);
                        }
                    } else {
                        return reject(error);
                    }
                });
            });
        }

    //}
}


var _p = new Promise(function(){
    console.log(22222);
    return 'aa';
});

console.log(_p);

_p.then(function(rs1){
    console.log('rs1: ', rs1);
    return 'bbb';
}).done();
