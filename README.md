# starter-electron-nodejs-angular

A starter project demonstrating how to spawn an Express app from Electron, node JS best practices and angular on front

Express App:

## How to run

1. Clone the code repository.
2. Open terminal to code repository.
3. Make sure a copy of `Node.exe` and `Node.lib` are copied to the root of the 
code repository.
4. Run `npm install`. (See Dependencies above)
5. Change directories to the express-app folder and run `npm install`.
6. Change directories back to the root of the code repository.
7. Run `npm start` to start the application.

## Package with Electron-Packager

If you would like to package this using `electron-packager` you'll need to 
make the following change:

In index.html (line ~65):

```javascript
app = require('electron').remote.app,
node = spawn(".\\node.exe", ["./express-app/bin/www"], { cwd: app.getAppPath() })
```

This makes sure the path to our local copy of `node.exe` is correct when we run
electron to start the app.

That said, I'm assuming the platform is Windows. If other platforms are desirable
additional changes are required.

## Running on Linux

Download standalone distribution of Node:
[https://nodejs.org/dist/latest-v7.x/node-v7.10.0-linux-x64.tar.gz](https://nodejs.org/dist/latest-v7.x/node-v7.10.0-linux-x64.tar.gz)

Unpack it into the root of the cloned repository. Then create a symbolic link called 'node' at the same location.

```
ln -sf node-v7.10.0-linux-x64/bin/node node
```

Here is a screenshot of what it should look like:

![File-Layout-Linux](screenshots/express-with-electron-linux-folder-structure-screenshot.png)

Change line 65 in index.html to the following:

```javascript
node = spawn("./node", ["./express-app/bin/www"], { cwd: process.cwd() })
```

Then you can run it like this:

```
./node start-electron.js &
```

Or edit the scripts section in 'package.json' and change it to:

```json
  "scripts": {
    "start": "./node start-electron.js"
  },
```

Then run

```
npm start
```
