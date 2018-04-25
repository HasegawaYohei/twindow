import React from 'react';
import { LinearProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

// const renderIframe = tweet => {
//   if (regexpUrl.test(tweet)) {
//     const src = `${tweet.match(regexpUrl)}`;
//     return (
//       <iframe src={src}></iframe>
//     );
//   }
// }
const renderAtag = href => {
  if (href != null) {
    return <a href={href} target='_blank'>{href}</a>
  }
}


const TweetCardComponent = props => {
  return (
    <div style={{margin: '0 auto'}}>
      <Paper style={{backgroundColor: '#FAFAFA'}}>
        <Grid container justify='center' spacing={8}>
          <Grid item xs={12} sm={12}>
            <Grid container>
              <Grid item xs={3} sm={3}>
                <img src={props.image} alt='user'/>
              </Grid>
              <Grid item xs={9} sm={9}>
                <Typography variant="title" align='left'style={{color: '#37474F'}}>
                  {props.name}
                </Typography>
                <Typography variant="subheading" align='left' color="textSecondary">
                  <a target='_blank' href={`https://twitter.com/${props.screenName}`} style={{textDecoration: 'none'}}>{props.screenName}</a>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Divider/>
            <Typography variant="body2" align="left" color="inherit" style={{paddingTop: 5, paddingBottom: 10, color: '#212121'}}>
              {props.tweet}
              {renderAtag(props.href)}
            </Typography>
              {/* {renderIframe(props.tweet)} */}
          </Grid>
        </Grid>
      </Paper>
      <LinearProgress value={props.time / 4000 * 100} color='secondary' variant="determinate"/>
    </div>
  );
}

export default TweetCardComponent;