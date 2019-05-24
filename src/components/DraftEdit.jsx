import React, { Component } from "react"
// import Button from "./form-idea/Button"
import { deleteOneIdea } from "../api/apiHandler";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// this component will render edit/ delete buttons
// EDIT --> goes to CREATE IDEA PAGE (sends idea info) from parent
// DELETE --> prompts DIALOGUE box to confirm --> on confirm --> removes idea from user, from DB

class editDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      edit: false,
      delete: false,
    }
  }

  // should populate with idea page
  editSubmit = (e) => {
    e.preventDefault();
    this.setState({
      redirect: true,
      edit: true,
    })
  }

  // should delete the idea from user and DB
  deleteSubmit = (e) => {
    e.preventDefault();
    // axios delete method
    deleteOneIdea(this.props.id)
      .then(res => {
        // this.setState({
        //   delete: true,
        // },
        this.props.sendToParent(e)
      })
      .catch(err => {
        console.log("error on draft delete: ", err.response);
      })
  }

  render() {
    if (this.state.redirect && this.state.edit) { return <Redirect to={`/create-idea/${this.props.id}`} /> }
    return (
      <div className="editDelete">
        <button className="iconButton edit" onClick={this.editSubmit} >
            <FontAwesomeIcon icon="edit" className="editDeleteIcon social" />
            <span className="innerTxtBtn">Edit</span>
        </button>
        <button className="iconButton delete" onClick={this.deleteSubmit}>
            <FontAwesomeIcon icon="trash-alt" className="editDeleteIcon social" />
            <span className="innerTxtBtn">Delete</span>
        </button>
      </div>
    )
  }
}

export default editDelete