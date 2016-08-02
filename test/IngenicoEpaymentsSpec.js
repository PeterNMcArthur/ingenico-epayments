"use strict";

const expect = require("chai").expect;
const IngenicoEpayments = require('./../IngenicoEpayments');


describe("IngenicoEpayments", function () {

  describe("orderObj", () => {

    it('It should sort all the objects in to alphabetical order', () => {
			let obj = {
				name: "James",
				age: 12
			}
      let result = IngenicoEpayments.orderObj(obj)
      expect(JSON.stringify( result )).to.equal('{"age":12,"name":"James"}')
    })

  })

 describe("propertyToString", () => {

  it("It should convert the object's keys and values to an array of strings", () => {

      let obj = {
        age: 12,
        name: "James"
      }
      let result = IngenicoEpayments.propertyToString(obj)
      expect(result).to.eql(["age=12", "name=James"])

  })

 })

 describe("apendSHASignature", () => {

  it("Should append the SHA signature to the end of each string and return a single string", () => {

    let arrayOfStrings = [
      "age=12",
      "name=James"
    ]

    let result = IngenicoEpayments.apendSHASignature(arrayOfStrings, 'ItsANiceDay!!!!')

    expect(result).to.equal('age=12ItsANiceDay!!!!name=JamesItsANiceDay!!!!')

  })

 })

 describe("objectToSignatureString()", () => {

	 it("Takes an object and a SHA-IN and converts it in to a single sorted string", () => {

	let obj = {
		name: "Peter",
		age: 27
	}

		 let result = IngenicoEpayments.objectToSignatureString(obj, "PiratesAreCool")

		 expect(result).to.equal('age=27PiratesAreCoolname=PeterPiratesAreCool')

	 })

 })

 describe("formResults", () => {
 
	 it("it will return a string with the properties and the correctly encrypted SHASIGN attached", () => {

		 let obj = {
			 name: "Peter",
			 age: 27
		 }

		 let result = IngenicoEpayments.formResults(obj, "anotherTest", "SHA1")

		 expect(result).to.equal("age=27&name=Peter&SHASIGN=6794c5ba8ba0477ecdb201f879992d332964741b")

	 })
 
 })

})
