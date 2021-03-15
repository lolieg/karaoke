const ss = require('socket.io-stream')

const uid = function () {
  return Math.random().toString(36).substr(2, 9)
}
const getUsername = function (id, room) {
  for (const player of room.players) {
    if (player.id === id) {
      return player.username
    }
  }
}
const getRoom = function (id) {
  for (const room of Object.values(rooms)) {
    for (const player of room.players) {
      if (player.id === id) {
        return room
      }
    }
  }
}

const rooms = {}
export default function (socket, io) {
  console.log('client connected with id: ' + socket.id)
  ss(socket).on('stream', (stream, data) => {
    console.log('stream')
    const newStream = ss.createStream()
    ss(socket).emit('streamBack', newStream, data)
    // stream.pipe(newStream)
    io.of('/')
      .in(getRoom(socket.id))
      .sockets.forEach((value, key) => {
        // don't send the stream back to the initiator
        console.log(key)
        // if (key !== socket.id) {
        const newStream = ss.createStream()
        ss(value).emit('streamBack', newStream, data)

        // }
      })
    stream.pipe(newStream)
  })
  return Object.freeze({
    createRoom(msg) {
      const id = uid()
      socket.join(id)
      // socket.username = msg.username
      rooms[id] = {
        id,
        players: [{ id: socket.id, username: msg.username, leader: true }],
        inviteCode: uid(),
      }
      return { id }
    },
    joinRoom(msg) {
      let found = false
      let id = ''
      for (const [key, value] of Object.entries(rooms)) {
        if (value.inviteCode === msg.code) {
          found = true
          id = key
        }
      }
      if (!found) {
        return { status: 'invalid' }
      }
      socket.join(id)
      rooms[id].players.push({
        id: socket.id,
        username: msg.username,
        leader: false,
      })

      io.in(id).emit('roomChange', { room: rooms[id] })
      return { status: 'success', id }
    },
    kickPlayer(msg) {
      for (const player of rooms[msg.room].players) {
        if (msg.id === player.id) {
          rooms[msg.room].players.splice(
            rooms[msg.room].players.indexOf(player),
            1
          )
          io.in(msg.room).emit('roomChange', { room: rooms[msg.room] })
          io.in(msg.room).emit('roomLeave', { id: msg.id })
        }
      }
    },
    getRoom(msg) {
      const room = rooms[msg.id]
      if (room === undefined) {
        return { id: '', players: [] }
      }
      return room
    },
    sendMessage(msg) {
      io.in(msg.room).emit('message', {
        message: msg.message,
        author: getUsername(socket.id, rooms[msg.room]),
      })
    },
    play(msg) {
      io.to(msg.room).emit('play', {
        songName: msg.songName,
        artistName: msg.artistName,
        songLength: msg.songLength,
      })
    },
    disconnect(msg) {
      for (const [key, value] of Object.entries(rooms)) {
        for (const player of value.players) {
          if (player.id === socket.id && player.leader) {
            delete rooms[key]
            io.in(key).emit('roomDelete')
          } else if (player.id === socket.id) {
            rooms[key].players.splice(rooms[key].players.indexOf(player), 1)
            io.in(key).emit('roomChange', { room: rooms[key] })
          }
        }
      }

      console.log(socket.id + ' disconnected')
    },
  })
}
