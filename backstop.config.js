const fs = require('fs');
const path = require('path');

/**
 * Recursively requires all modules matching a specific name pattern.
 * @param {string} dir - The starting directory path.
 * @param {string} searchName - The substring to match in filenames (e.g., 'visual').
 * @returns {Array} An array of exported module contents.
 */
function requireModulesRecursively(dir, searchName) {
  let modules = [];
  
  // Read all contents of the directory
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      // Recursively enter subfolders
      modules = modules.concat(requireModulesRecursively(fullPath, searchName));
    } else if (stats.isFile() && file.includes(searchName) && file.endsWith('.js')) {
      // Require the module if it matches the name and is a JS file
      try {
        const exported = require(fullPath);
        modules.push(exported);
      } catch (err) {
        console.error(`Failed to load module: ${fullPath}`, err);
      }
    }
  });

  return modules;
}

// Usage Example:
// Starting from the current directory, find all files containing 'visual'
const visualModules = requireModulesRecursively(__dirname + '/src/components/', 'visual');

const testConfig = {
  "id": "backstop_default",
  "viewports": [
    {
      "label": "phone",
      "width": 320,
      "height": 480
    },
    {
      "label": "tablet",
      "width": 1024,
      "height": 768
    }
  ],
  "onBeforeScript": "playwright/onBefore.js",
  "onReadyScript": "playwright/onReady.js",
  "scenarios": [
    ...visualModules.flat() // Flatten the array of modules if they are nested
  ],
  "paths": {
    "bitmaps_reference": "testing/backstop/backstop_data/bitmaps_reference",
    "bitmaps_test": "testing/backstop/backstop_data/bitmaps_test",
    "engine_scripts": "testing/backstop/backstop_data/engine_scripts",
    "html_report": "testing/backstop/backstop_data/html_report",
    "ci_report": "testing/backstop/backstop_data/ci_report"
  },
  "report": ["browser"],
  "engine": "playwright",
  "engineOptions": {
    "args": ["--no-sandbox"]
  },
  "asyncCaptureLimit": 5,
  "asyncCompareLimit": 50,
  "debug": false,
  "debugWindow": false
}

module.exports = testConfig;