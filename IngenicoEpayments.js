"use strict"
const crypto = {
	SHA1: require("crypto-js/sha1"),
	SHA256: require("crypto-js/sha256"),
	SHA512: require("crypto-js/sha512"),
}

//Order the keys in the object alphabetically
const orderObj = ( obj ) => {
	let listOfKeys = Object.keys(obj)
	let sortedKeys = listOfKeys.sort((a, b) => b.toUpperCase() < a.toUpperCase())
	return sortedKeys.reduce((acc, keyName) => {
		acc[keyName] = obj[keyName]
		return acc
	}, {})
}

//Convert each key pair value to a string joined with a '='
const propertyToString = obj => {
	let listOfKeys = Object.keys(obj)
	return listOfKeys.map(keyName => {
		return `${keyName}=${obj[keyName]}`
	})
}

//Adds the SHA-IN passphrase to each of the key value pairs 
//For more information visit: https://payment-services.ingenico.com/int/en/ogone/support/guides/integration%20guides/e-commerce/security-pre-payment-check#shainsignature
const apendSHASignature = (arrayOfStrings, sig) => {
	return arrayOfStrings.reduce((acc, str) => {
		acc += `${str}${sig}`
		return acc
	}, '')
}

//Creates the string that Ingenico are requesting with the SHASIGN omitted
const objectToSignatureString = ( obj, sig ) => {
	let orderedObj = orderObj(obj)
	let stringyObject = propertyToString(orderedObj)
	let result = apendSHASignature(stringyObject, sig)
	return result
}

//Creates the final string to be send to Ingenico
const formResults = (obj, sig, encryption) => {
	let stringToEncrypt = objectToSignatureString(obj, sig)
	obj.SHASIGN = crypto[encryption](stringToEncrypt)
	//test SHASIGN is correct using: https://secure.ogone.com/ncol/test/testsha.asp
	let sortedObj = orderObj(obj)
	let concatObj = propertyToString(sortedObj)
	return concatObj.join('&')
}

module.exports = {
	orderObj,
	propertyToString,
	formResults,
	apendSHASignature,
	objectToSignatureString
}

