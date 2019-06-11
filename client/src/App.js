import React from 'react';
import axios from "axios";
import MenuForm from "./components/MenuForm";
import MenuList from "./components/MenuList";
import { Container, Header, } from "semantic-ui-react";

class App extends React.Component {
  state = { todos: [], };

  componentDidMount() {
    axios.get("/api/items")
      .then( res => {
        this.setState({ menus: res.data, });
      })
      .catch( err => {
        console.log(err);
      })
  };

  addMenu = (name) => {
    axios.post("/api/items", { name, })
      .then( res => {
        this.setState({ menuss: [...this.state.menus, res.data], });
      })
  };

  updateMenu = (id) => {
    axios.put(`/api/items/${id}`)
      .then( res => {
        const menus = this.state.menus.map( t => {
          if (t.id === id)
            return res.data;
          return t;
        });
        this.setState({ menus, });
      })
  };

  deleteMenu = (id) => {
    axios.delete(`/api/items/${id}`)
      .then( res => {
        const { menus, } = this.state;
        this.setState({ menus: menus.filter( t => t.id !== id ), })
      })
  };

  render() {
    return (
      <Container style={{ padding: "50px 0", }}>
        <Header as="h1">Rails/React MENU</Header>
        <br />
        <MenuForm addMenu={this.addMenu} />
        <br />
        <br />
        <MenuList 
          menus={this.state.menus}
          updateMenu={this.updateMenu}
          deleteMenu={this.deleteMenu}
        />
      </Container>
    );
  };
};

export default App;

