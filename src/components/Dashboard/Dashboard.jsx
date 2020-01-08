import React, { Component } from "react";
import Axios from "axios";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: "",
      userPosts: true,
      posts: []
    };
  }

  async componentDidMount() {
    await Axios.get("/api/posts").then(res => {
      console.log(res.data);
      this.setState({
        posts: res.data
      });
    });
    console.log(this.state.posts);
  }

  handleChange(e, key) {
    this.setState({
      [key]: e.target.value
    });
  }

  resetSearch = () => {
    this.setState({
      searchInput: ""
    });
  };

  toggleCheck = () => {
    this.setState({
      userPosts: !this.state.userPosts
    });
  };

  displayPosts = () => {
    this.state.posts.map((e, i, a) => {
      return (
        <div>
          <h3 className="postTitle">{e.title}</h3>
          <h4 className="username">{e.username}</h4>
          <img src={e.profilePic} alt={e.username} />
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        Dashboard.jsx
        <input
          onChange={e => this.handleChange(e, "searchInput")}
          value={this.state.searchInput}
        />
        <button>Search</button>
        <button onClick={() => this.resetSearch()}>Reset</button>
        <div>Don't include your posts</div>
        <input
          type="checkbox"
          value={this.state.userPosts}
          onClick={() => this.toggleCheck()}
        />
        {this.state.posts.map((e, i) => {
          return (
            <div>
              <h3 className="postTitle">{e.title}</h3>
              <h4 className="username">{e.username}</h4>
              <img src={e.profile_picture} alt={e.username} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Dashboard;
