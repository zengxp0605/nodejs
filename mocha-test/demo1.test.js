var should = require("should");

var name = "zhaojian";

describe("Name", function() {
    it("The name should be zhaojian", function() {
        name.should.eql("zhaojian");
    });
});

var Person = function(name) {
    this.name = name;
    // this.age = '25';
    this.age = 25;
    this.code = 1001;
};
var zhaojian = new Person(name);


describe("InstanceOf", function() {
    it("Zhaojian should be an instance of Person", function() {
        zhaojian.should.be.an.instanceof(Person);
    });

    it("Zhaojian should be an instance of Object", function() {
        zhaojian.should.be.an.instanceof(Object);
    });
});


describe("Property", function() {
    it("Zhaojian should have property age", function() {
        zhaojian.should.have.property("age");
    });

    it("Zhaojian should have property code", function() {
        zhaojian.should.have.property("code");
    });
});

describe('Typeof Property', function() {
    it("Zhaojian's age should be a Number", function() {
        should(zhaojian.age).be.a.Number();
    });

    it("Zhaojian's code should be a Number and eq 1001", function() {
        should(zhaojian.code).be.exactly(1001).and.be.a.Number();
    });
});

/***************************异步函数测试*****************************/

var fs = require("fs");

describe("readFile", function() {
    it("The file content should be zhaojian", function(done) {
        fs.readFile("text.txt", "utf8", function(err, data) {
            data.should.eql("zhaojian");
            done();
        });
    });
});