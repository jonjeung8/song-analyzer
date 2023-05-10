import React from "react"
import { Container } from "react-bootstrap"

const client_id='1f39da23cbd74e79bc7cd6d4e31cd7f0'
const redirect_uri='http://localhost:3000/callback'
const scope='user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public';

let url = 'https://accounts.spotify.com/authorize';

url += '?client_id=' + encodeURIComponent(client_id);
url += '&response_type=code';
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&scope=' + encodeURIComponent(scope);

const AUTH_URL = url;

export default function Login() {
    return (
        <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
        >
        <a className="btn btn-success btn-lg" href={AUTH_URL}>
            Login With Spotify
        </a>
        </Container>
    )
}
