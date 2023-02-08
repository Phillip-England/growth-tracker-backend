import { Validator, ValidationOptions } from "../lib/validator"

export default class UserModel {
  username: string
  password: string
  email: string

  usernameOptions?: ValidationOptions
  passwordOptions?: ValidationOptions
  emailOptions?: ValidationOptions

  constructor(username: string, password: string, email: string) {
    this.username = username
    this.password = password
    this.email = email
  }

  async validate() {
    this.usernameOptions = {
      stringName: "Username",
      required: true,
      maxLength: 32,
      minLength: 5,
      okSymbols: "-_",
    }

    this.emailOptions = {
      stringName: "Email",
      required: true,
      isEmail: true,
    }

    this.passwordOptions = {
      stringName: "Password",
      required: true,
      minLength: 8,
      maxLength: 64,
      okSymbols: "!@#$%^&*",
      hash: true,
      hasUppercaseLetter: true,
      hasNumber: true,
      hasSymbol: true,
    }

    let usernameValidator: Validator = new Validator(this.usernameOptions)
    let emailValidator = new Validator(this.emailOptions)
    let passwordValidator: Validator = new Validator(this.passwordOptions)

    this.username = await usernameValidator.validate(this.username)
    this.email = await emailValidator.validate(this.email)
    this.password = await passwordValidator.validate(this.password)
  }
}

module.exports = UserModel
