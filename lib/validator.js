const bcrypt = require('bcryptjs')

class Validator {

  constructor(options) {

    if (options == undefined) {
      throw new Error("Validator constructor requires options")
    }
     
    if (options.stringName == undefined) {
      throw new Error("Validator constructor requires options.stringName")
    }

    this.stringName = options.stringName
    this.required = options.required || undefined
    this.maxLength = options.maxLength || undefined
    this.minLength = options.minLength || undefined
    this.okSymbols = options.okSymbols || undefined
    this.toLowerCase = options.toLowerCase || undefined
    this.isEmail = options.isEmail || undefined
    this.hash = options.hash || undefined
    this.hasUppercaseLetter = options.hasUppercaseLetter || undefined
    this.hasNumber = options.hasNumber || undefined
    this.hasSymbol = options.hasSymbol || undefined

  }

  async validate(value) {

    if (this.required == true) {
      if (value.length == 0) {
        throw new Error(`${this.stringName} is required`)
      }
    }

    if (this.maxLength !== undefined) {
      if (value.length > this.maxLength) {
        throw new Error(`${this.stringName} must be ${this.maxLength} characters or less`)
      }
    }

    if (this.minLength !== undefined) {
      if (value.length < this.minLength) {
        throw new Error(`${this.stringName} must be ${this.minLength} or more characters`)
      }
    }

    if (this.okSymbols !== undefined) { 
      let regexString = "^[a-zA-Z0-9" + this.okSymbols + "]+$"
      let regex = new RegExp(regexString)
      if (regex.test(value) == false) {
        throw new Error(`${this.stringName} can only contain the following symbols: ${this.okSymbols}`)
      }
    }

    if (this.toLowerCase == true) {
      value = value.toLowerCase()
    }

    if (this.isEmail == true) {
      value = value.toLowerCase()
      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (regex.test(value) == false) {
        throw new Error("Please enter a valid email address")
      }
    }

    if (this.hasUppercaseLetter) {
      let regex = /^(?=.*[A-Z]).+$/
      if (regex.test(value) == false) {
        throw new Error(`${this.stringName} must contain at least one uppercase letter`)
      }
    }

    if (this.hasNumber) {
      let regex = /^(?=.*[A-Z]).+$/
      if (regex.test(value) == false) {
        throw new Error(`${this.stringName} must contain at least one number`)
      }
    }

    if (this.hasSymbol) {
      let regexString = "^(?=.*[" + this.okSymbols + "]).+$"
      let regex = new RegExp(regexString)
      if (regex.test(value) == false) {
        throw new Error(`${this.stringName} must contain at least one of the following symbols: ${this.okSymbols}`)
      }
    }

    // MUST BE LAST IN CALL CHAIN
    if (this.hash == true) {
      const salt = await bcrypt.genSalt(10)
      value = await bcrypt.hash(value, salt)
    }

    return value

  }

}

module.exports = Validator