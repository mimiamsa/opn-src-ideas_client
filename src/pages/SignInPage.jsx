import React, { Component } from 'react'
import { AuthConsumer } from "./../auth/Guard";
// import { withRouter } from "react-router-dom"

class SignInPage extends Component {

  state = {
    email: "",
    password: ""
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e, signin, user) => {
    e.preventDefault()
    console.log(this.props)
    signin(() => {
      this.props.history.push(`/${user.firstname}`);
    }, this.state);
  }

  render() {
    return (
      <>
        <AuthConsumer>
          {({ signin, user }) => (
            <form onChange={this.handleChange} onSubmit={(e) => this.handleSubmit(e, signin, user)}>
              <label htmlFor="email">Email</label>
              <input type="text" />
              <label htmlFor="password">Password</label>
              <input type="password" />
              <button>Sign in</button>
            </form>
          )}
        </AuthConsumer>
        <button onClick={this.props.closeModal}>close</button>
      </>
    )
  }
}
export default SignInPage;
// export default withRouter(SignInPage)