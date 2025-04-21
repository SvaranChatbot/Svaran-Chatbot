// Kunal Sharma 2023uma0221
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const backend = spawn('python', ['app.py'], {
  cwd: path.join(__dirname, '../backend'),
  stdio: 'inherit',
  shell: true
});

const frontend = spawn('npm', ['run', 'start-frontend'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

backend.on('close', code => {
  console.log(`\n🚫 Backend process exited with code ${code}`);
});

frontend.on('close', code => {
  console.log(`\n🚫 Frontend process exited with code ${code}`);
});
