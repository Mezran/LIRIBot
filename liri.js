require("dotenv").config(); // inport dotenv
const axios = require('axios'); // for OMDB
const Spotify = require('node-spotify-api'); // for spotify
const keys = require("./keys.js"); // loads spotify keys

const fs = require("fs"); // loads file system

const spotify = new Spotify(keys.spotify);
// console.log(spotify);


// Get user commands from command line
let command = process.argv[2];
// console.log(`command entered: ${command}`);

let parameters = process.argv.slice(3).join('+');
console.log(`parameters: ${parameters}`);



switch (command) {
  case 'concert-this':
    console.log("Sorry, this is broken :( ");
    break;

  case 'spotify-this-song':
    // run spotify search
    if(parameters === ''){
      parameters = "The Sign"
    }
    spotify.search({
      type: 'track',
      query: parameters
    }, function(err, data) {
      if (err) {
        return console.log("error: " + err);
      }
      const songsArray = data.tracks.items;
      for(let i = 0; i < songsArray.length; i++){
        console.log("*******************************")
        console.log(`Artist: ${songsArray[i].artists[0].name}`)
        console.log(`Song Name: ${songsArray[i].name}`)
        console.log(`Preview link: ${songsArray[i].preview_url}`)
        console.log(`Album: ${songsArray[i].album.name}`)
        console.log("*******************************")
      }
    })
    break;

  case 'movie-this':
  if (parameters === ''){
    parameters = "Dunkirk"
  }
    // run OMDB search
    const queryUrl = "http://www.omdbapi.com/?t=" + parameters + "&y=&plot=short&apikey=trilogy";
    console.log(`Querying: ${queryUrl}`);
    axios.get(queryUrl).then(function(data) {
      // console.log(data);
        console.log(`Title: ${data.data.Title}`);
        console.log(`Release Date: ${data.data.Released}`);
        console.log(`IMDB Rating: ${data.data.Ratings[0].Value}`);
        console.log(`Rotten Tomatoes Rating: ${data.data.Ratings[1].Value}`);
        console.log(`Country Produced: ${data.data.Country}`);
        console.log(`Language: ${data.data.Language}`);
        console.log(`Plot: ${data.data.Plot}`);
        console.log(`Actors: ${data.data.Actors}`);
      })
      .catch(function(err) {
        console.log(err.message);
      });

    break;

  case 'do-what-it-says':
    // run search based off of random.txt file
    fs.readFile("random.txt", 'utf8', function(err, data) {
      if (err) {
        return console.log(err);
      } else if (data.split(',')[0] === 'movie-this'){
        const parameters = data.split(',')[1];
        const queryUrl = "http://www.omdbapi.com/?t=" + parameters + "&y=&plot=short&apikey=trilogy";
        console.log(`Querying: ${queryUrl}`);
        axios.get(queryUrl).then(function(data) {
          // console.log(data);
            console.log(`Title: ${data.data.Title}`);
            console.log(`Release Date: ${data.data.Released}`);
            console.log(`IMDB Rating: ${data.data.Ratings[0].Value}`);
            console.log(`Rotten Tomatoes Rating: ${data.data.Ratings[1].Value}`);
            console.log(`Country Produced: ${data.data.Country}`);
            console.log(`Language: ${data.data.Language}`);
            console.log(`Plot: ${data.data.Plot}`);
            console.log(`Actors: ${data.data.Actors}`);
          })
          .catch(function(err) {
            console.log(err.message);
          });


      } else if (data.split(',')[0] === 'spotify-this-song') {
        let toSearch = data.split(',')[1];
        toSearch.split(' ').join('+')
        console.log('searching ' + toSearch);
        spotify.search({
          type: 'track',
          query: toSearch
        }, function(err, data) {
          if (err) {
            return console.log("error: " + err);
          } //end if err
          const songsArray = data.tracks.items;
          for(let i = 0; i < songsArray.length; i++){
            console.log("*******************************")
            console.log(`Artist: ${songsArray[i].artists[0].name}`)
            console.log(`Song Name: ${songsArray[i].name}`)
            console.log(`Preview link: ${songsArray[i].preview_url}`)
            console.log(`Album: ${songsArray[i].album.name}`)
            console.log("*******************************")
          }
        });
      } // end else
    })
    break;

  default:
    console.log("invalid command? ");

}
