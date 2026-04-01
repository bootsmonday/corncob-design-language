const { execSync } = require('child_process');

// Port is default Vite port, can be overridden by environment variable
const port = process.env.PORT || 5173;
const isWindows = process.platform === 'win32';

const cmd = isWindows 
  ? `netstat -ano | findstr :${port}` 
  : `lsof -i :${port}`;

try {
  // Execute the command
  execSync(cmd, { stdio: 'ignore' }); 
  // If no error was thrown, the port is OPEN
  process.exit(0); 
} catch (err) {
  // If an error was thrown, the port is CLOSED/FREE
  console.error(`Port ${port} is not open. Start the development server to continue testing.`);
  process.exit(1); 
}