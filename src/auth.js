"use strict"

import KEYS from "./keys"
import axios from "axios"

const generateRandomString = length => {
	let text = ""
	let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}

const getHashParams = () => {
	let hashParams = {}
	let e,
		r = /([^&;=]+)=?([^&;]*)/g,
		q = window.location.hash.substring(1)
	while ((e = r.exec(q))) {
		hashParams[e[1]] = decodeURIComponent(e[2])
	}
	return hashParams
}

document.getElementById("login-button").addEventListener(
	"click",
	function() {
		console.log("Login clicked")
		let state = generateRandomString(16)
		let url = KEYS.authUrl
		url += "?response_type=token"
		url += "&client_id=" + encodeURIComponent(KEYS.appId)
		url += "&scope=" + encodeURIComponent(KEYS.scope)
		url += "&redirect_uri=" + encodeURIComponent(KEYS.redirectUrl)
		url += "&state=" + encodeURIComponent(state)
		localStorage.setItem(KEYS.stateKey, state)
		window.location = url
	},
	false
)

let params = getHashParams()
let {access_token, state} = params
let storedState = localStorage.getItem(KEYS.stateKey)

if (access_token && (state == null || state !== storedState)) {
	alert("There was an error during the authentication")
} else {
	localStorage.removeItem(KEYS.stateKey)
	if (access_token) {
		console.log("Got the token" + access_token)
		axios
			.get(KEYS.apiUrl + "me", {
				headers: {Authorization: "Bearer " + access_token}
			})
			.then(response => {
				console.log(response.data)
				localStorage.setItem(KEYS.userBaseUrl, response.data.href)
				axios
					.get(KEYS.apiUrl + "me/playlists", {
						headers: {
							Authorization: "Bearer " + access_token
						}
					})
					.then(response => {
						console.log(response.data)
					})
			})
			.catch(() => {
				console.log("Error while fetching the playlist data")
			})
	} else {
		// $("#login").show()
		// $("#loggedin").hide()
	}
}
