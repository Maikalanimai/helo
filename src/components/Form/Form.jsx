import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import Axios from "axios";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      imgUrl: "",
      content: ""
    };
  }

  handleChange(e, key) {
    this.setState({
      [key]: e.target.value
    });
  }

  post = () => {
    Axios.post("/api/post", {
      user_id: this.props.id,
      title: this.state.title,
      content: this.state.content,
      image_url: this.state.imgUrl
    }).then(
      alert('Post added'),
      this.props.history.push('/dashboard')
    );
  };

  render() {
    if (!this.props.id) return <Redirect to="/" />;
    return (
      <div>
        Form.jsx
        <input
          placeholder={"Post Title"}
          onChange={e => this.handleChange(e, "title")}
        />
        <input
          placeholder={"Image URL"}
          onChange={e => this.handleChange(e, "imgUrl")}
        />
        <textarea
          placeholder={"Post Body"}
          onChange={e => this.handleChange(e, "content")}
        />
        <button onClick={() => this.post()}>Submit Post</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { id } = state;
  return { id };
};

export default connect(mapStateToProps)(withRouter(Form));
