"use strict"
console.log("Starting")
export default () => "Hello, world!"

document.getElementById("submit").addEventListener("click", e => {
	const selected = document.getElementById("project").value
	console.log(selected)
	document.getElementById(
		"output"
	).innerHTML = `<p> You have selected project ${selected} </p>`
})
