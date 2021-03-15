const io = require('socket.io-client')

export default async function ({ params, redirect }) {
  const socket = io('http://localhost:3000')
  const room = await new Promise((resolve) =>
    socket.emit('getRoom', { id: params.room }, (resp) => resolve(resp))
  )
  if (room.id === '') {
    return redirect('/')
  }
}
