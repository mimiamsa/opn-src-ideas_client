import React, { Component } from 'react';
import Button from "./Button";
import AddCategories from "./AddCategories";
import AddTags from "./../form-idea/AddTags"
import { createOneIdea, updateOneIdea, getOneIdea } from "../../api/apiHandler";
import { Redirect } from "react-router-dom";

class FormCreateIdea extends Component {
  constructor(props) {
    super(props)
    const checkId = props.match.params.id;
    this.state = {
      title: "",
      description: "",
      redirect: false,
      category: "",
      createdIdeaId: checkId || "",
      tags: [],
      creator_name: props.loggedUser ? props.loggedUser.name : "",
      creator: props.loggedUser ? props.loggedUser._id : "",
      upvotes: 1,
      upvotedUsers: props.loggedUser ? [props.loggedUser._id] : "",
      existingIdea: false,
      submit: false,
      passUser: null,
    }
    console.log("form idea props: ", props)
  }

  componentDidMount() {
    !this.state.createdIdeaId ? console.log("") : 
    (getOneIdea(this.state.createdIdeaId)
        .then(res => {
          console.log(res.data)
          this.setState({
            title: res.data.idea.title,
            description: res.data.idea.description,
            category: res.data.idea.category,
            tags: res.data.idea.tags,
            existingIdea: true,
          })
          // console.log(`state tags:`, this.state.tags)
        })
        .catch(err => {
          console.log("ici2", err.response);
        }))
  }

  handleInput = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    }, this.props.updatePreview({
      [evt.target.name]: evt.target.value,
    }))
  }

  handleTags = (tags) => {
    // console.log("parent!!!", tags)
    this.setState({
      tags: tags
    })
    // console.log(this.state)
  }

  handleSave = (evt) => {
    evt.preventDefault();

    // if its a new idea --> create; if it's an existing --> update
    this.state.existingIdea ? 
    updateOneIdea(this.state.createdIdeaId, {...this.state, isPublic: false})
    .then(res => {
        // console.log("successfully updated, here is the result: ", res)
        this.setState({
          redirect: true,
          createdIdeaId: this.state.createdIdeaId
        })
      })
      .catch(err => {
        console.log("error creating on save update", err.response);
      }) 
    : 
    createOneIdea({...this.state, isPublic: false})
    .then(res => {
        this.props.sendToParent();
        console.log("create one idea save, response: ", res)

        this.setState({
          redirect: true,
          createdIdeaId: this.state.createdIdeaId
        })
      })
      .catch(err => {
        console.log("error creating on save create", err.response);
      })
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    // const { title, description, category, tags } = this.state;
    // if (!title || !description || !category || !tags.length) {
    //   return console.log("nope")
    // }
    this.state.existingIdea ? 
    updateOneIdea(this.state.createdIdeaId, {...this.state, isPublic: true})
    .then(res => {
        console.log("successfully updated, here is the result: ", res)
        this.setState({
          redirect: true,
          createdIdeaId: this.state.createdIdeaId,
          submit: true,
        })
      })
      .catch(err => {
        console.log("error creating on save update", err.response);
      }) 
    :
    createOneIdea({...this.state, isPublic: true})
      .then(res => {
        this.setState({
          redirect: true,
          createdIdeaId: res.data.dbSuccess._id,
          submit: true,
        })
      })
      .catch(err => {
        console.log("ici", err.response);
      })
  }

  render() {
    if (this.state.redirect && this.state.submit) {return <Redirect to={`/idea/${this.state.createdIdeaId}`} />}
    else if (this.state.redirect && !this.state.submit) {return <Redirect to={{
      pathname : `/@${this.state.creator_name}`,
      loggedUser : {name: "THEATEALTJSTLKJWERJWEIRAER"}}} />}

    return (
      <form id="idea-form" className="form" >
        <div className="inputGroup">
          <label className="formLabel" htmlFor="idea-title">Title - required</label>
          <input
            value={this.state.title}
            className="textInput"
            name="title"
            type="text"
            placeholder="what will it be/ do/ achieve?"
            onChange={this.handleInput}
          />
        </div>
        
        <div className="inputGroup">
          <label className="formLabel" htmlFor="idea-title">Description - required</label>
          <textarea
            value={this.state.description}
            className="textInput areaInput"
            name="description"
            type="text"
            placeholder="Tell us more!"
            onChange={this.handleInput}
          />
        </div>
        
        <div className="inputGroup">
          <label className="formLabel">Topic</label>
          <AddCategories sendCatToParent={this.handleInput} category={this.state.category} {...this.props} />
        </div>

        <div className="inputGroup">
          <label className="formLabel">Tags</label>
          <AddTags sendDataToParent={this.handleTags} tags={this.state.tags} />
        </div>

        <div className="buttonGroup">
          <Button className="button secondary" button_name="Save draft" onClick={this.handleSave} />
          <Button className="button primary" button_name="Publish" onClick={this.handleSubmit} />
        </div>
      </form>
    )
  }

}

export default FormCreateIdea 