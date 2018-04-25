import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';

export default class SearchBox extends Component {
  state = {
    name: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <Grid container justify='center'>
        <Grid item xs={12} sm={12}>
          <form action="https://www.google.co.jp/search" target="_blank">
            <TextField
              id="name"
              name='q'
              placeholder="Google で検索"
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
              style={{margin: 30}}
            />
          </form>
        </Grid>
      </Grid>
    );
  }
}