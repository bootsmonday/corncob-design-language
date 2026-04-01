const net = require('net');

// Port is default Vite port, can be overridden by environment variable
const port = parseInt(process.env.PORT || '5173', 10);

const socket = net.connect({ port, host: '127.0.0.1' });

socket.setTimeout(5000);

socket.once('connect', () => {
  socket.destroy();
  process.exit(0);
});

socket.once('timeout', () => {
  socket.destroy();
  console.error(`Timed out checking port ${port}. Start the development server to continue testing.`);
  process.exit(1);
});

socket.once('error', (err) => {
  socket.destroy();
  if (err.code === 'ECONNREFUSED') {
    console.error(`Port ${port} is not open. Start the development server to continue testing.`);
  } else {
    console.error(`Unexpected error checking port ${port}: ${err.message}`);
  }
  process.exit(1);
});