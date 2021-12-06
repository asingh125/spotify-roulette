# Spotify Roulette

## Welcome to Spotify Roulette, a game where you try to guess your friends' music taste!

Each round, a song from a different player's playlist will show up on the screen, and each player must guess whose they think it came from. The person with the most correct guesses at the end of the game wins.

To start playing, create an account with your username, password, and a link to your favorite Spotify playlist. Make sure to link this account to your Spotify account once you're logged in. Have fun!


# How to Run

Clone the repository onto your machine. Cd into the root directory and run "npm install". Start the program by running "npm run dev". The program will run on "http://localhost:3000/". 


**IMPORTANT:** Due to issues with redirects, there are two cases where the user has to copy a link from the terminal and paste it into broswer. 
1. First, when the user clicks the button that connects their Spotify account to the app, the must open their terminal and copy and paste the link printed there into their browser (it should link to "https://accounts.spotify.com/MORE_STUFF_HERE). 
2. Second, after the user clicks Start Game, the user needs to paste the link generated in their terminal into their browser (it should be of the format "http://localhost:3000/game/GAME_ID", where GAME_ID is a unique string). 

**IMPORTANT:** You also need to download this Chrome extension and enable it for some of the API requests to work: https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc?hl=en-US