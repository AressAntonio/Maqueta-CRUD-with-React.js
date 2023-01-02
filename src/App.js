import React, { Component } from "react";
import "./App.css";
import axios from 'axios';

const apiEndpoint= 'https:jsonplaceholder.typicode.com/posts';

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount(){
    const {data: posts}=await axios.get(apiEndpoint);
    console.log(Response);
    this.setState({posts});
  }

  handleAdd = async () => {
    const obj= {title: 'New Element', body: 'Sin contenido'};
    const {data:post}=await axios.post(apiEndpoint, obj);
    console.log(post);
    const posts=[post, ...this.state.posts];
    this.setState({posts});
  };

  handleUpdate = async post => {
    post.title = 'ACTUALIZADO';
    await axios.put(apiEndpoint + '/' + post.id, post);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index]= {...post};
    this.setState({posts});

    console.log('Update', post);
  };

  handleDelete = async post => {
    await axios.delete(apiEndpoint + "/" + post.id, post);
    const posts = this.state.posts.filter(p => p.id !==post.id);
    this.setState({posts});
    console.log('Delete', post);
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Agregar
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Actualizar</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td className="td">{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Actualizar
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Borrar
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
