import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { Route } from "react-router-dom";

import { AuthConsumer } from "./Guard";
// import SignUpModal from "../pages/modals/SignUpModal";
// import SignUpModal from '../pages/modals/SignUpModal';

// below : use of the rest parameter
/* 
@mdn : A function's last parameter can be prefixed with "..."
which will cause all remaining (user supplied) arguments to be placed within a "standard" javascript array. 
Only the last parameter can be a "rest parameter".
*/
const ProtectedRoute = ({ component: Component, ...rest }) => {
  

  return <AuthConsumer>
    {({ loginStatus }) => (

      <Route
        render={props => {
          return loginStatus ? (
            <Component {...props} />
          ) : (
              <>
                {/* <SignUpModal /> */}
                <Redirect to="/signup" />
              </>
            );
        }}
        {...rest} // pass all passed (rest) argument(s) in a literal object to the Route
      />
    )}
  </AuthConsumer>
};

// {({ loginStatus }) => (
//   <Route
//     render={props => {
//       return loginStatus ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/signin" />
//       );
//     }}
//     {...rest} // pass all passed (rest) argument(s) in a literal object to the Route
//   />
// )}

export default ProtectedRoute;
