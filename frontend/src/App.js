import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props);
    // set the initial state
    this.state = {
      token: "",
      deviceId: "",
      loggedIn: false,
      error: "",
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      playing: false,
      position: 0,
      duration: 1,
    };
    // this will later be set by setInterval
    this.playerCheckInterval = null;
  }
  
  // when we click the "go" button
  handleLogin() {
    if (this.state.token !== "") {
      // change the loggedIn variable, then start checking for the window.Spotify variable
      this.setState({ loggedIn: true });
      this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
    }
  }
  
  // when we receive a new update from the player
  onStateChanged(state) {
    // only update if we got a real state
    if (state !== null) {
      const {
        current_track: currentTrack,
        position,
        duration,
      } = state.track_window;
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const playing = !state.paused;
      this.setState({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing
      });
    } else {
      // state was null, user might have swapped to another device
      this.setState({ error: "Looks like you might have swapped to another device?" });
    }
  }
  
  createEventHandlers() {
    // problem setting up the player
    this.player.on('initialization_error', e => { console.error(e); });
    // problem authenticating the user.
    // either the token was invalid in the first place,
    // or it expired (it lasts one hour)
    this.player.on('authentication_error', e => {
      console.error(e);
      this.setState({ loggedIn: false });
    });
    // currently only premium accounts can use the API
    this.player.on('account_error', e => { console.error(e); });
    // loading/playing the track failed for some reason
    this.player.on('playback_error', e => { console.error(e); });
  
    // Playback status updates
    this.player.on('player_state_changed', state => this.onStateChanged(state));
  
    // Ready
    this.player.on('ready', async data => {
      let { device_id } = data;
      console.log("Let the music play on!");
      // set the deviceId variable, then let's try
      // to swap music playback to *our* player!
      await this.setState({ deviceId: device_id });
      this.transferPlaybackHere();
    });
  }
  
  checkForPlayer() {
    const { token } = this.state;
    
    // if the Spotify SDK has loaded
    if (window.Spotify !== null) {
      // cancel the interval
      clearInterval(this.playerCheckInterval);
      // create a new player
      this.player = new window.Spotify.Player({
        name: "Matt's Spotify Player",
        getOAuthToken: cb => { cb(token); },
      });
      // set up the player's event handlers
      this.createEventHandlers();
      
      // finally, connect!
      this.player.connect();
    }
  }
  
  onPrevClick() {
    this.player.previousTrack();
  }
  
  onPlayClick() {
    this.player.togglePlay();
  }
  
  onNextClick() {
    this.player.nextTrack();
  }
  
  transferPlaybackHere() {
    const { deviceId, token } = this.state;
    // https://beta.developer.spotify.com/documentation/web-api/reference/player/transfer-a-users-playback/
    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "device_ids": [ deviceId ],
        // true: start playing music if it was paused on the other device
        // false: paused if paused on other device, start playing music otherwise
        "play": true,
      }),
    });
  }
  
  render() {
    const {
      token,
      loggedIn,
      trackName,
      artistName,
      albumName,
      error,
      playing
    } = this.state;
    
    return (
      <div className="App">
        <div className="App-header">
          <h2>Now Playing</h2>
          <p>A Spotify Web Playback API Demo.</p>
        </div>
      
        {error && <p>Error: {error}</p>}
      
        {loggedIn ?
        (<div>      
          <p>Artist: {artistName}</p>
          <p>Track: {trackName}</p>
          <p>Album: {albumName}</p>
          <p>
            <button onClick={() => this.onPrevClick()}>Previous</button>
            <button onClick={() => this.onPlayClick()}>{playing ? "Pause" : "Play"}</button>
            <button onClick={() => this.onNextClick()}>Next</button>
          </p>
        </div>)
        :  
        (<div>
          <p className="App-intro">
            Enter your Spotify access token. Get it from{" "}
            <a href="https://beta.developer.spotify.com/documentation/web-playback-sdk/quick-start/#authenticating-with-spotify">
              here
            </a>.
          </p>
          <p>
            <input type="text" value={token} onChange={e => this.setState({ token: e.target.value })} />
          </p>
          <p>
            <button onClick={() => this.handleLogin()}>Go</button>
          </p>
        </div>)
        }
      </div>
    );
  }
}

export default App;

// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { BrowserRouter } from "react-router-dom"
// import { Routes } from "react-router-dom"
// import { Route } from "react-router-dom"
// import { Link } from "react-router-dom"
// import HomePage from './components/HomePage'
// import SignUp from './components/SignUp'
// import Login from './components/Login'
// import SpotifyPlayer from 'react-spotify-web-playback';

 
// const App = () => {

//   return (
// <>
// <SpotifyPlayer
//     token="BQDjOr6NToFm7QWzOtGLgwChj7mtZSxAdnXR972ItxG6xTl5xt219pxr-2yTXzsvhomG90DF-QfRZJ8fnB_75VMezbk6NHXtkkKjUTV9cLAgpP-ohH-UPNyd1MzMskCIYNDMKrbZpSScKXAVdSbOiFeZSexrAGni4GOAvhHzg3UVeJgb_XvV8eY"
//     uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
//   />
// </>
//   )
// }

// export default App
