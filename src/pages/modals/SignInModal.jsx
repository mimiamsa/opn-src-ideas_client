import React, { Component } from 'react'
import { AuthConsumer } from "./../../auth/Guard";
import { withRouter} from "react-router-dom"
class SignInModal extends Component {
  state = {
    email: "foo@bar.baz",
    password: "1234"
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(this.state)
  }

  handleSubmit = (e, signin) => {
    e.preventDefault()
    signin((res) => {
      console.log(res)
      console.log(this.props)
      console.log(this.state)
      this.props.history.push("/");
      this.props.closeModal()
    }, this.state);
  }
  render() {
    // console.log("sign up", this.props)
    const { email, password } = this.state;

    return (
      <div className="auth-modal-container">
        <AuthConsumer>
          {({ signin, user }) => (
            <form onChange={this.handleChange} onSubmit={(e) => this.handleSubmit(e, signin, user)}>
              <label htmlFor="email">Email</label>
              <input type="text" defaultValue={email} />
              <label htmlFor="password">Password</label>
              <input type="password" defaultValue={password} />
              <button>Sign in</button>
            </form>
          )}
        </AuthConsumer>
        <button onClick={this.props.closeModal}>close</button>
      </div>
    )
  }
}

export default withRouter(SignInModal)