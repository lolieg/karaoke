const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const axios = require('axios')
require('dotenv').config()

app.use(bodyParser.json())

app.get('/getLyrics', (req, res) => {
  axios
    .get(
      `https://api.textyl.co/api/lyrics?q=${req.query.songName} ${req.query.artistName}`,
      { timeout: 3000 }
    )
    .then((r) => res.json({ lrc: r.data }))
    .catch((r) => res.json({ lrc: null }))
})
app.get('/getSongs', (req, res) => {
  try {
    const songs = fs.readdirSync(path.join(__dirname, '../assets/songs'))
    const formatted = songs.map((el) => {
      return el.slice(0, -4)
    })
    res.json(formatted)
  } catch (e) {
    console.log(e)
  }
})
module.exports = app
