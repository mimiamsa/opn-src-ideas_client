import React, { Component } from 'react';
import './styles/scss/main.scss';
import { Switch, Route} from "react-router-dom";
import NavMain from "./components/NavMain";
// import AuthService from './api/auth-service';
import Home from "./pages/Home"
// import Signup from "./pages/Signup"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"

import CreateIdea from "./pages/CreateIdea"
import IdeaPage from "./pages/IdeaPage"
import UserProfile from "./pages/UserProfile"
import SearchResults from "./pages/SearchResults"
// import EditProfile from "./pages/EditProfile"
// import ProfileArchives from "./pages/ProfileArchives"
import ProtectedRoute from "./auth/ProtectedRoute";

import Page404 from "./pages/Page404"
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLinkedin, faTwitter, faProductHunt } from '@fortawesome/free-brands-svg-icons'
import { faPoo, faHeart, faMapMarkerAlt, faSearch, faComment, faTrophy} from '@fortawesome/free-solid-svg-icons'
// import { classBody } from '@babel/types';
library.add(faPoo, faHeart, faMapMarkerAlt, faLinkedin, faProductHunt, faTwitter, faSearch, faTrophy, faComment)


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // loggedIn: false,
      // loggedUser: null,
      archivedIdeas: [],
    };
    // this.service = new AuthService();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
  }

  // fetchUser = () => {
  //   if( this.state.loggedUser === null ){
  //     this.service.loggedin()
  //       .then(response =>{
  //         this.setState({
  //           loggedIn: true,
  //           loggedUser:  response
  //         }, console.log("fetched user: ", response)) 
  //       })
  //       .catch( err =>{
  //         this.setState({
  //           loggedUser:  null
  //         }) 
  //       })
  //   }
  // }

  // getUser = (userObj) => {
  //   this.setState({
  //     loggedIn: this.state.loggedIn ? false : true,
  //     loggedUser: userObj,
  //   })
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.loggedUser !== prevProps.loggedUser) {
  //     this.setState({
  //       hello: "hi",
  //     })
  //   }
  // }

  handleScroll = (e) => {
    var logoText = document.getElementsByClassName("logoText");
    if (window.scrollY > 300){
      logoText[0].classList.add("hidden");
      logoText[1].classList.add("hidden");
      logoText[2].classList.add("hidden");
      logoText[3].classList.add("hidden");
    }
    else {
      logoText[0].classList.remove("hidden");
      logoText[1].classList.remove("hidden");
      logoText[2].classList.remove("hidden");
      logoText[3].classList.remove("hidden");
    }
  }

  render() {
    // this.fetchUser()
    return (
      <div className="App" onScroll={this.handleScroll}>
      
      <NavMain {...this.state}/>
        <main id="main">
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} />} />
            
            <Route path="/search" render={(props) => <SearchResults {...props} />} />

            <Route exact path="/signup" render={() => <SignUpPage />} />
            <Route exact path="/signin" render={() => <SignInPage />} />
            {/* <Route exact path="/create-idea" render={(props) => <CreateIdea {...props} />} /> */}

            {/* <Route exact path="/@:name/edit" render={(props) => <EditProfile loggedUser={this.state.loggedUser} {...props} />} />
            <Route exact path="/@:name/archive" render={(props) => <ProfileArchives loggedUser={this.state.loggedUser} {...props} />} /> */}
            <ProtectedRoute exact path="/create-idea" component={CreateIdea}/>} />

            <Route exact path="/user/:fullname" render={(props) => <UserProfile {...props} />} />
            <Route exact path="/create-idea/:id" render={(props) => <CreateIdea {...props} />} />
            <Route exact path="/idea/:id" render={(props) => <IdeaPage {...props} />} />
            <Route path="/*" render={() => <Page404 />} />
          </Switch>
        </main>
      </div>
    )
  };
}

export default App;
