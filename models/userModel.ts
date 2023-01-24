// const Validator = require('../lib/validator')
import { Validator, ValidationOptions } from '../lib/validator'

export default class UserModel {

  username: string
  password: string
  email: string

  constructor(username: string, password: string, email: string) {
    this.username = username
    this.password = password
    this.email = email
  }

  async validate() { 

    let usernameOptions: ValidationOptions = {
      stringName: "Username",
      required: true,
      maxLength: 32,
      minLength: 5,
      okSymbols: '-_',
      toLowerCase: true
    }

    let passwordOptions: ValidationOptions = {
      stringName: "Password",
      required: true,
      minLength: 8,
      maxLength: 64,
      okSymbols: '!@#$%^&*',
      hash: true,
      hasUppercaseLetter: true,
      hasNumber: true,
      hasSymbol: true
    }
    
    let emailOptions: ValidationOptions = {
      stringName: "Email",
      required: true,
      isEmail: true,
    }

    let usernameValidator: Validator = new Validator(usernameOptions)
    let passwordValidator: Validator = new Validator(passwordOptions)
    let emailValidator = new Validator(emailOptions)

    this.username = await usernameValidator.validate(this.username)
    this.password = await passwordValidator.validate(this.password)
    this.email = await emailValidator.validate(this.email)

  }

}

module.exports = UserModel