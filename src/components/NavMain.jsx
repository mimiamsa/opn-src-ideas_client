import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
// import AuthService from '../api/auth-service';
import SignUp from '../pages/modals/SignUpModal';
import SignIn from '../pages/modals/SignInModal';
import { AuthConsumer } from "./../auth/Guard";
import { withRouter } from "react-router-dom"

class NavMain extends Component {
  state = {
    showModalSignUp: false,
    showModalSignIn: false,
  }

  activeBurger = (e, clbksignout) => {
    this.activeAnimation()
    if (e.target.className === "navLinkExpanded signup-link" || e.target.className === "navLinkExpanded create-link") {
      this.setState({ showModalSignUp: true })
    }
    if (e.target.className === "navLinkExpanded signin-link") {
      this.setState({ showModalSignIn: true })
    }
    if (e.target.className === "navLinkExpanded signout-link") {
      clbksignout((res) => {
        console.log("the user status is", res)
        this.props.history.push("/")
      })
    }
  }

  activeAnimation = () => {
    var bar1, bar2, bar3, expandingNav, mainNav;
    bar1 = document.querySelector(".bar1");
    bar3 = document.querySelector(".bar3");
    bar2 = document.querySelector(".bar2");
    expandingNav = document.querySelector(".expandingNav");
    mainNav = document.querySelector(".mainNav");
    bar1.classList.toggle("croix");
    bar3.classList.toggle("croix");
    bar2.classList.toggle("croix");
    expandingNav.classList.toggle("visibleNav");
    mainNav.classList.toggle("noBorderBottom");
  }

  closeBurger = () => {
    var bar1, bar2, bar3, expandingNav, mainNav;
    bar1 = document.querySelector(".bar1");
    bar3 = document.querySelector(".bar3");
    bar2 = document.querySelector(".bar2");
    expandingNav = document.querySelector(".expandingNav");
    mainNav = document.querySelector(".mainNav");
    bar1.classList.remove("croix");
    bar3.classList.remove("croix");
    bar2.classList.remove("croix");
    expandingNav.classList.remove("visibleNav");
    mainNav.classList.remove("noBorderBottom");
  }

  closeModal = () => {
    this.setState({ showModalSignUp: false, showModalSignIn: false })
  }

  render() {
    const { showModalSignUp, showModalSignIn } = this.state
    return (
      <React.Fragment>

        {showModalSignUp ? <SignUp closeModal={this.closeModal} /> : showModalSignIn ? <SignIn history={this.props.history} closeModal={this.closeModal} /> : ""}

        <nav className="mainNav">
          <NavLink className="navLogo" onClick={this.closeBurger} activeClassName="is-active" to="/" exact>Op
          <span className="logoText">e</span>nS<span className="logoText">o</span><span className="logoText">u</span>rc<span className="logoText">e</span>&mdash;IDEAS
          </NavLink>
          <div id="container" className="burgerMenu" onClick={this.activeBurger}>
            <div className="burgerItem bar1"></div>
            <div className="burgerItem bar2"></div>
            <div className="burgerItem bar3"></div>
          </div>
        </nav>
        <AuthConsumer>
          {({ signout, loginStatus, user }) =>

            <div className="expandingNav">

              <>
                {loginStatus && user ? (
                  <>
                    <NavLink className="navLinkExpanded" onClick={this.activeBurger} to={`/user/${user.firstname}-${user.lastname}`}>My profile</NavLink>
                    <div className="navLinkExpanded signout-link" onClick={(e) => this.activeBurger(e, signout)} >Sign out</div>
                    <NavLink className="navLinkExpanded" onClick={this.activeBurger} to="/create-idea">Share an idea</NavLink>
                  </>
                ) :
                  <>
                    <div className="navLinkExpanded signup-link" onClick={this.activeBurger}>Sign up</div>
                    <div className="navLinkExpanded signin-link" onClick={this.activeBurger} >Sign in</div>
                    <div className="navLinkExpanded create-link" onClick={this.activeBurger}>Share an idea</div>
                  </>
                }

              </>


            </div>
          }
        </AuthConsumer>
      </React.Fragment>
    )
  }
}

export default withRouter(NavMain)
