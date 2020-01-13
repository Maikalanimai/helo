import React, { Component } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./dashboard.css";
import { updateUser } from "../../ducks/reducer";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: "",
      userPosts: true,
      posts: [],
      filtPosts: []
    };
  }

  async componentDidMount() {
    this.props.username !== ""
      ? await Axios.get("/api/posts").then(res => {
          this.setState({
            posts: res.data
          });
          let filteredPosts = this.state.posts.filter(
            post => post.username !== this.props.username
          );
          this.setState({
            filtPosts: filteredPosts
          });
        })
      : this.props.history.push("/");
    console.log(
      Axios.post("/auth/checklogin").then(res => {
        console.log(res.data);
        if ((res.status === 200)) {
          const { id, username, profilePic } = res.data.userData;
          this.props.updateUser(username, id, profilePic);
          this.props.history.push("/dashboard");
        } else {
          console.log("failed login");
        }
      })
    );
  }

  handleChange(e, key) {
    this.setState({
      [key]: e.target.value
    });
  }

  searchPosts = () => {
    Axios.get(`/api/filtposts?search=${this.state.searchInput}`).then(res => {
      this.setState({
        posts: res.data
      });
      let filteredPosts = this.state.posts.filter(
        post => post.username !== this.props.username
      );
      this.setState({
        filtPosts: filteredPosts
      });
    });
  };

  resetSearch = () => {
    Axios.get("/api/posts").then(res => {
      this.setState({
        posts: res.data
      });
      let filteredPosts = this.state.posts.filter(
        post => post.username !== this.props.username
      );
      this.setState({
        filtPosts: filteredPosts
      });
    });
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
        <header className="search-bar">
          <input
            onChange={e => this.handleChange(e, "searchInput")}
            value={this.state.searchInput}
          />
          <button className="dash-button" onClick={() => this.searchPosts()}>
            Search
          </button>
          <button className="dash-button" onClick={() => this.resetSearch()}>
            Reset
          </button>
          <div>Don't include your posts</div>
          <input
            placeholder="search"
            type="checkbox"
            value={this.state.userPosts}
            onClick={() => this.toggleCheck()}
          />
        </header>
        <main>
          {this.state.userPosts
            ? this.state.posts.map((e, i) => {
                return (
                  <div
                    className="post"
                    key={i}
                    onClick={() => this.props.history.push(`/post/${e.id}`)}
                  >
                    <h1 className="postTitle">{e.title}</h1>
                    <h2 className="username">{e.username}</h2>
                    <img src={e.profile_picture} alt={e.username} />
                  </div>
                );
              })
            : this.state.filtPosts.map((e, i) => {
                return (
                  <div
                    className="post"
                    key={i}
                    onClick={() => this.props.history.push(`/post/${e.id}`)}
                  >
                    <h1 className="postTitle">{e.title}</h1>
                    <h2 className="username">{e.username}</h2>
                    <img src={e.profile_picture} alt={e.username} />
                  </div>
                );
              })}
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { username } = state;
  return { username };
};

export default connect(mapStateToProps, { updateUser })(withRouter(Dashboard));
