const bcrypt = require('bcryptjs')

export interface ValidationOptions {
  stringName: string
  required?: boolean
  maxLength?: number
  minLength?: number
  okSymbols?: string
  toLowerCase?: boolean
  isEmail?: boolean
  hash?: boolean
  hasUppercaseLetter?: boolean
  hasNumber?: boolean
  hasSymbol?: boolean
}

export class Validator {

  options: ValidationOptions

  constructor(options: ValidationOptions) {
    this.options = options
  }

  async validate(value: string) {

    if (this.options.required == true) {
      if (value.length == 0) {
        throw new Error(`${this.options.stringName} is required`)
      }
    }

    if (this.options.maxLength !== undefined) {
      if (value.length > this.options.maxLength) {
        throw new Error(`${this.options.stringName} must be ${this.options.maxLength} characters or less`)
      }
    }

    if (this.options.minLength !== undefined) {
      if (value.length < this.options.minLength) {
        throw new Error(`${this.options.stringName} must be ${this.options.minLength} or more characters`)
      }
    }

    if (this.options.okSymbols !== undefined) { 
      let regexString = "^[a-zA-Z0-9" + this.options.okSymbols + "]+$"
      let regex = new RegExp(regexString)
      if (regex.test(value) == false) {
        throw new Error(`${this.options.stringName} can only contain the following symbols: ${this.options.okSymbols}`)
      }
    }

    if (this.options.toLowerCase == true) {
      value = value.toLowerCase()
    }

    if (this.options.isEmail == true) {
      value = value.toLowerCase()
      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (regex.test(value) == false) {
        throw new Error("Please enter a valid email address")
      }
    }

    if (this.options.hasUppercaseLetter) {
      let regex = /^(?=.*[A-Z]).+$/
      if (regex.test(value) == false) {
        throw new Error(`${this.options.stringName} must contain at least one uppercase letter`)
      }
    }

    if (this.options.hasNumber) {
      let regex = /^(?=.*[A-Z]).+$/
      if (regex.test(value) == false) {
        throw new Error(`${this.options.stringName} must contain at least one number`)
      }
    }

    if (this.options.hasSymbol) {
      let regexString = "^(?=.*[" + this.options.okSymbols + "]).+$"
      let regex = new RegExp(regexString)
      if (regex.test(value) == false) {
        throw new Error(`${this.options.stringName} must contain at least one of the following symbols: ${this.options.okSymbols}`)
      }
    }

    // MUST BE LAST IN CALL CHAIN
    if (this.options.hash == true) {
      const salt = await bcrypt.genSalt(10)
      value = await bcrypt.hash(value, salt)
    }

    return value

  }

}

// module.exports = Validator