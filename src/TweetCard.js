import React, { Component } from 'react';
import TweetCardComponent from './TweetCardComponent';
import axios from 'axios';

class TweetCard extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.tweets = [];
    this.regexpUrl = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g;
    const tweet = {
      name: '',
      screenName: '',
      image: '',
      tweet: ''
    };
    this.state = {
      tweet,
      time: 4000
    };
  }

  tick() {
    if (this.state.time <= 0) {
      this.stopTimeBar();
      const originalTweet = this.tweets.shift();
      const tweet = this.formatTweet(originalTweet);
      if (this.tweets.length === 0) this.fetchTweets();
      this.setState({
        tweet,
        time: 4900
      });
      this.startTimeBar();
    }
    else {
      this.setState({
        time: this.state.time - 80
      });
    }
  }

  async fetchTweets() {
    const response = await axios.get('/tweets');
    this.tweets = response.data;
  }

  formatTweet(tweet) {
    if (this.regexpUrl.test(tweet.tweet)) {
      const href = tweet.tweet.match(this.regexpUrl)[0];
      const text = tweet.tweet.replace(this.regexpUrl, '');
      console.log(text);

      tweet.href = href;
      tweet.text = text;
    }
    else {
      tweet.text = tweet.tweet;
    }

    return tweet;
  }

  async componentWillMount() {
    await this.fetchTweets();
    const originalTweet = this.tweets.shift();
    const tweet = this.formatTweet(originalTweet);
    this.setState({
      tweet
    });
  }

  componentDidMount() {
    this.startTimeBar();
  }

  startTimeBar() {
    this.timeBar = setInterval(this.tick, 80);
  }

  stopTimeBar() {
    clearInterval(this.timeBar);
  }

  render() {
    return (
      <div style={{margin: 15}}>
        <TweetCardComponent
          name={this.state.tweet.name}
          screenName={this.state.tweet.screenName}
          image={this.state.tweet.image}
          tweet={this.state.tweet.text}
          href={this.state.tweet.href}
          time={this.state.time}
        />
      </div>
    );
  }
}

export default TweetCard;