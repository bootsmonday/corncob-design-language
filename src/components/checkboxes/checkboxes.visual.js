// Update VISUAL_TEST_BASE_URL or this default if your dev server runs on a different host/port
const baseurl = process.env.VISUAL_TEST_BASE_URL || "http://127.0.0.1:5173";
const url = `${baseurl}/stickersheets/checkboxes.html`;
const defaultSelectors = '#test-stickersheet';


const tests =  [
  {
    "label": "Checkboxes Visual Test",
    "url": url,
    "referenceUrl": "",
    "readyEvent": "",
    "readySelector": "",
    "delay": 0,
    "hideSelectors": [],
    "removeSelectors": [],
    "hoverSelector": "",
    "clickSelector": "",
    "postInteractionWait": 0,
    "selectors": [defaultSelectors],
    "selectorExpansion": true,
    "expect": 0,
    "misMatchThreshold" : 0.1,
    "requireSameDimensions": true
  }
];

module.exports = tests;

