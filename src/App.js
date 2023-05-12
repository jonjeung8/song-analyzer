import "bootstrap/dist/css/bootstrap.min.css"
import { Container, InputGroup, FormControl, Row, Card } from "react-bootstrap"
import { useState, useEffect } from "react"
import "./App.css"

const client_id='1f39da23cbd74e79bc7cd6d4e31cd7f0'
const client_secret='def7a5faf70b4d3fbb5340689fb7d39d'

function App() {
const [search_input, setSearchInput] = useState("");
const [access_token, setAccessToken] = useState("");

const [album_image, setAlbumimage] = useState("");
const [song_name, setSongName] = useState("");
const [artist_name, setArtistName] = useState("");
const [album_name, setAlbumName] = useState("");
const [song_duration, setSongDuration] = useState("");
const [song_tempo, setSongTempo] = useState("");
const [external_link, setExternalLink] = useState("");

  useEffect(() => {
    var authParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id='+ client_id + '&client_secret=' + client_secret
    }
    fetch('https://accounts.spotify.com/api/token', authParams)
      .then(response => response.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

  async function search() {
    var trackParams = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
      }
    }

    // function setTime(ms) {
    //   var mins = Math.floor(ms / 60000);
    //   var secs = ((ms % 60000) / 1000).toFixed(0);
    //   return (secs == 60 ? (mins+1) + ":00" : mins + ":" + (secs < 10 ? "0" : "") + secs);
    // }

    var track_id = await fetch('https://api.spotify.com/v1/search?q=' + search_input + '&type=track' , trackParams)
    .then(response => response.json())
    .then(data => {return data.tracks.items[0].id})
    
    var track_info = await fetch('https://api.spotify.com/v1/tracks/' + track_id , trackParams) 
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setAlbumimage(data.album.images[0].url)
      setSongName(data.name)
      setArtistName(data.artists[0].name)
      setAlbumName(data.album.name)
      setExternalLink(data.external_urls.spotify)

    })
    var track_stats = await fetch('https://api.spotify.com/v1/audio-features/' + track_id , trackParams)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setSongDuration(data.duration_ms)
      setSongTempo(data.tempo)
    
    })
  }

  return (
  <div className="App" class="text-white">

  <div className="App-header" class="d-flex p-3 justify-content-center">
    <h1 >Spotify Song Search</h1>
  </div>
    <Container>
      <InputGroup className="m-3" size="lg">
              <FormControl  
                type="input" 
                placeholder="Search for Song" 
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    search()};
                  }
                }
                onChange={event => setSearchInput(event.target.value)}
              />
              <button class="btn btn-success" onClick={search}>Search</button>
      </InputGroup>
    </Container>
    <Container>
    <Row className="mx-2 row row-cols-4">
        <Card className="d-flex m-2 align-items-center">
          <Card.Img class="img-thumbnail"  src={album_image}/>
        </Card>
        <Card className="d-flex m-2">
          <Card.Body>
            <h5 class="text-black">Song: {song_name}</h5>
            <p class="text-muted">Artist: {artist_name}</p>
            <p class="text-muted">Album: {album_name}</p>
            <p class="text-muted">Duration: {song_duration}</p>
            <p class="text-muted">Tempo: {song_tempo}</p>
            <a type="button" class="btn btn-success" href={external_link}>Listen on Spotify</a>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  </div>
  );
}

export default App