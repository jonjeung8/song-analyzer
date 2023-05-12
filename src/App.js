import "bootstrap/dist/css/bootstrap.min.css"
import { Container, InputGroup, FormControl, Button, Row, Card } from "react-bootstrap"
import { useState, useEffect } from "react"

const client_id='1f39da23cbd74e79bc7cd6d4e31cd7f0'
const client_secret='def7a5faf70b4d3fbb5340689fb7d39d'
const redirectUri = 'http://localhost:3000/callback';



function App() {
const [searchInput, setSearchInput] = useState("");
const [access_token, setAccessToken] = useState("");

  useEffect(() => {
    var authParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials&client_id='+ client_id + '&client_secret=' + client_secret
    }
    fetch('https://accounts.spotify.com/api/token', authParams)
    .then(response => response.json())
    .then(data => setAccessToken(data.access_token))
  }, [])

  return (
  <div className="App">
    <Container>
      <InputGroup className="mb-3" size="lg">
              <FormControl 
                type="input" 
                placeholder="Search for Song" 
                onChange={event => setSearchInput(event.target.value)}
              />
              <Button onClick={() => {console.log(searchInput)}}>Search</Button>
      </InputGroup>
    </Container>
    <Container>
    <Row className="mx-2 row row-cols-4">
        <Card>
          <Card.Img src="#" />
          <Card.Body>
            <Card.Title>{searchInput}</Card.Title>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  </div>
  );
}

export default App