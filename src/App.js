import React, { Component } from 'react';
import TweetCard from './TweetCard';
import './App.css';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import SearchBox from './SearchBox';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Grid container justify='center' style={{marginTop: 30}}>
        <Grid item xs={11} sm={6}>
          <Paper style={{paddingTop: 50, paddingBottom: 50}}>
            <Typography variant="display2" align='center' style={{color: '#F50057'}}>
              Twindow
            </Typography>
            <SearchBox/>
            <TweetCard />
          </Paper>
        </Grid>
      </Grid>
      </div>
    );
  }
}

export default App;