

class Person {
    sayHello () {
        console.log('hello Person...');
    }
}

export default class Foo extends Person {

    sayHello () {
        console.log('hello Foo...');

    }
}