import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAuth(code) {
    const {access_token, setAccessToken} = useState();
    const {refresh_token, setRefreshToken} = useState();
    const {expires_in, setExpiresIn} = useState();

    useEffect(() => { 
        axios
        .post('http://localhost:3001/login', {
        code, 
        })
        .then(res => {
        console.log(res.data);
        window.history.pushState({}, null, '/');
        })
    }, [code])
}
