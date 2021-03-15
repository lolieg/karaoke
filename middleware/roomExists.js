const io = require('socket.io-client')

export default async function ({ params, redirect }) {
  const socket = io(
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3001'
      : 'http://karaoke.speedy-schumachers.ml'
  )
  const room = await new Promise((resolve) =>
    socket.emit('getRoom', { id: params.room }, (resp) => resolve(resp))
  )
  if (room.id === '') {
    return redirect('/')
  }
}
