import React, { Component } from 'react'

export default class SignUpPage extends Component {
  render() {
    return (
      <div className="signup-form-container">
        <form className="signup-form" action="">
          <label htmlFor="username">Firstname</label>
          <input name="firstname" type="text" />
          <label htmlFor="lastname">Lastname</label>
          <input name="lastname" type="text" />
          <label htmlFor="username">Email</label>
          <input name="email" type="email" />
          <label htmlFor="username">Password</label>
          <input name="password" type="password" />
          <button>Sign up</button>
        </form>
      </div>
    )
  }
}
