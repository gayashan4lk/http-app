import React, { Component } from "react";
import axios from  "axios";
import "./App.css";

const API_ENDPOINT = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
      // Pending > resolved (success) OR rejected (failure)
      /*const promise = axios.get("https://jsonplaceholder.typicode.com/p0osts");
      console.log(promise);
      const response = await promise;
      console.log(response);*/

      const response = await axios.get(API_ENDPOINT);
      console.log(response);
      const { data: posts } = response;
      this.setState({ posts });

  }

handleAdd = async () => {
      const obj = { title: "some nice title", body: "oh hot body" };
      const response = await axios.post(API_ENDPOINT, obj);
      console.log(response);
      const { data: post } = response;
      const posts = [post, ...this.state.posts];
      this.setState({posts});
/*      const obj = { title: "some nice title", body: "oh hot body" };
      const promise = axios.post(API_ENDPOINT, obj);
      const response = await promise;
      console.log(response);*/
  };

  handleUpdate = async post => {
      post.title = "Updated";
      // const { data } = await axios.put(API_ENDPOINT + "/" + post.id, post);
      // axios.patch(API_ENDPOINT + "/" + post.id, { title: post.title });
      // console.log(data);
      await axios.put(API_ENDPOINT + "/" + post.id, post);
      const posts = [...this.state.posts];
      const index = posts.indexOf(post);
      posts[index] = {...post};
      // this.setState({posts: posts});
      this.setState({ posts });

  };

  handleDelete = post => {
    console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
