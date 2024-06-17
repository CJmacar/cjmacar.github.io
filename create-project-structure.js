const fs = require('fs');
const path = require('path');

// Function to create directories
function createDirectory(targetPath) {
    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
        console.log(`Created directory: ${targetPath}`);
    }
}

// Function to create files with content
function createFile(filePath, content = '') {
    fs.writeFileSync(filePath, content);
    console.log(`Created file: ${filePath}`);
}

// Base project patk
const projectPath = path.join(__dirname, 'island-creatives-website');

// Create directories
createDirectory(path.join(projectPath, 'public'));
createDirectory(path.join(projectPath, 'src'));
createDirectory(path.join(projectPath, 'src', 'components'));
createDirectory(path.join(projectPath, 'src', 'assets'));
createDirectory(path.join(projectPath, 'src', 'assets', 'images'));
createDirectory(path.join(projectPath, 'src', 'assets', 'styles'));

// Create files
createFile(path.join(projectPath, 'src', 'App.js'), `import React from 'react';\nfunction App() { return <div>App</div>; }\nexport default App;`);
createFile(path.join(projectPath, 'src', 'index.js'), `import React from 'react';\nimport ReactDOM from 'react-dom';\nimport './index.css';\nimport App from './App';\nReactDOM.render(<App />, document.getElementById('root'));`);
createFile(path.join(projectPath, 'src', 'assets', 'styles', 'index.css'), "/* CSS styles go here */");

// Add more files as needed

