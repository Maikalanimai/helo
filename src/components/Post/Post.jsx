import React, {Component} from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

class Post extends Component {
    constructor() {
        super()
        this.state = {
            userId: null,
            postId: null,
            username: '',
            postContent: '',
            postImage: '',
            userPic:'',
            postTitle: ''

        }
    }

    componentDidMount(){
        axios.get(`/api/post/${this.props.match.params.postid}`).then(res =>{
            console.log(res.data)
            this.setState({
                postId: res.data[0].id,
                postTitle: res.data[0].title,
                username: res.data[0].username,
                postContent: res.data[0].content,
                postImage: res.data[0].image_url,
                userPic: res.data[0].profile_picture,
                userId: res.data[0].user_id
            })})
    }

    delete(){
        axios.delete(`/api/post/${this.state.postId}`).then(res => {
            console.log(res.data)
            alert('Post Deleted')
            this.props.history.push('/dashboard')
        })
    }
    
    render(){
        // console.log(this.props)
        if (!this.props.id) return(<Redirect to='/'/>)
        return(
            <div>
                <h1>{this.state.postTitle}</h1>
                <img src={this.state.postImage} alt ={this.state.postTitle}/>
                <p>{this.state.postContent}</p>
                <h3>{this.state.username}</h3>
                <img src={this.state.userPic} alt = {this.state.username}/>
                {this.props.id === this.state.userId ? <button onClick={() => this.delete()}>Delete Post</button> : <></>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {id} = state
    return {id}
}

export default connect(mapStateToProps)(withRouter(Post))