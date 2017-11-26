var events = require('events')
var net = require('net')

var channel = new events.EventEmitter()

channel.clients = {}
channel.subscription = {}
channel.setMaxListeners(50)
channel.on('join', function (id, client) {
  var welcome = 'welcome!\n' + 'Guests online: ' + this.listeners('broadcast').length
  client.write(welcome + '\n')
  this.clients[id] = client
  this.subscription[id] = function (senderId, message) {
    if (id != senderId) {
      this.clients[id].write(message)
    }
  }
  this.on('broadcast', this.subscription[id])
})

channel.on('leave', function (id) {
  channel.removeListener('broadcast', this.subscription[id])
  channel.emit('broadcast, id, id + " has left the chat.\n"')
})

channel.on('shutdown', function () {
  channel.emit('broadcast', '', 'Chat has shutdown\n;')
  channel.removeAllListeners('broadcast')
})

var server = net.createServer(function (client) {
  var id = client.remoteAddress + ':' + client.remotePort
  channel.emit('join', id, client)
  client.on('data', function (data) {
    if (data == 'shutdown\r\n') {
      channel.emit('shutdown')
    }
    data = data.toString()
    channel.emit('broadcast', id, data)
  })
  client.on('end', function () {
    channel.emit('leave', id)
  })
})

server.listen(8888)