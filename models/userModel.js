const Validator = require('../lib/validator')

class UserModel {

  constructor(username, password, email) {
    this.username = username
    this.password = password
    this.email = email
  }

  async validate() { 

    let usernameOptions = new Validator({
      stringName: "Username",
      required: true,
      maxLength: 32,
      minLength: 5,
      okSymbols: '-_',
      toLowerCase: true
    })

    let passwordOptions = new Validator({
      stringName: "Password",
      required: true,
      minLength: 8,
      maxLength: 64,
      okSymbols: '!@#$%^&*',
      hash: true,
      hasUppercaseLetter: true,
      hasNumber: true,
      hasSymbol: true
    })

    let emailOptions = new Validator({
      stringName: "Email",
      required: true,
      isEmail: true,
    })

    this.username = await usernameOptions.validate(this.username)
    this.password = await passwordOptions.validate(this.password)
    this.email = await emailOptions.validate(this.email)

  }

}

module.exports = UserModel