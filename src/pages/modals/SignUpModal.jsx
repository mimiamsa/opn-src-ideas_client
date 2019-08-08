import React, { Component } from 'react'
import { createUser } from "./../../api/apiHandler";
import { withRouter } from "react-router-dom"

class SignUp extends Component {
  state = {
    firstname: "foo",
    lastname: "bar",
    email: "foo@bar.baz",
    password: "1234"
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(this.state)
  }
// componentDidMount(){
//   this.props.history.replace("/")
// }
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
    createUser(this.state)
      .then(res => {
        console.log(res)
        this.props.history.push("/signin")
        this.props.closeModal()
      })
      .catch(err => {
        console.log(err)
      })

  }

  render() {
    console.log(this.props, "---")
    return (
      <div className="auth-modal-container">
        <div className="signup-form-container">
          <form className="signup-form" onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <label htmlFor="firstname">Firstname</label>
            <input name="firstname" type="text" defaultValue={this.state.firstname} />
            <label htmlFor="lastname">Lastname</label>
            <input name="lastname" type="text"  defaultValue={this.state.lastname}/>
            <label htmlFor="username">Email</label>
            <input name="email" type="email"  defaultValue={this.state.email}/>
            <label htmlFor="password">Password</label>
            <input name="password" type="password"  defaultValue={this.state.password}/>
            <button>Sign up</button>
          </form>
        </div>
        <button onClick={this.props.closeModal}>close</button>
      </div>
    )
  }
}
export default withRouter(SignUp)