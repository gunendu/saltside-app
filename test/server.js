var request = require("request");
var chakram = require('chakram'),
expect = chakram.expect;

var old_console1 = console;

describe("post bird data", function () {
  it("returns 201 created", function () {
     var data = {"name":"gunendu","family":"dsds","continents":"Asia,dssd","visible":"true"};
     var response = chakram.post("http://localhost:9005/birds",data);
     expect(response).to.have.status(201);
     return chakram.wait();
  })
});

describe("gets all birds", function () {
  it("returns 200 ok", function () {
    var response =  chakram.get("http://localhost:9005/birds")
    expect(response).to.have.status(200);
    return chakram.wait();
  })
});

describe("gets bird by id", function () {
  it("returns 200 ok", function () {
    var response =  chakram.get("http://localhost:9005/birds/57d95d26e391874735a173b1")
    expect(response).to.have.status(200);
    return chakram.wait();
  })
});

describe("gets bird by id", function () {
  it("returns 404 bird not found", function () {
    var response =  chakram.get("http://localhost:9005/birds/57d95d26e391874735a173b")
    expect(response).to.have.status(404);
    return chakram.wait();
  })
});


describe("delete bird by id", function () {
  it("returns 200 ok", function () {
     var response = chakram.delete("http://localhost:9005/birds/57d9a0ee2db46861168ae447");
     expect(response).to.have.status(404);
     return chakram.wait();
  })
});

describe("delete bird by id", function () {
  it("returns 404 Not found", function () {
     var response = chakram.delete("http://localhost:9005/birds/57d9a0ee2db46861168ae44");
     expect(response).to.have.status(404);
     return chakram.wait();
  })
});
