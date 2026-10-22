import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornSlider } from '../../index.js';

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));

root.render(
  <div className="slider-demo">
    <h2>Corn Slider</h2>

    <h3>Default (md)</h3>
    <CornSlider id="slider" name="slider" label="Adjust the Corn Slider:" />

    <h3>Extra Small (xs)</h3>
    <CornSlider id="slider1" name="slider1" size="xs" label="Adjust the Corn Slider:" />

    <h3>Small (sm)</h3>
    <CornSlider id="slider2" name="slider2" size="sm" label="Adjust the Corn Slider:" />

    <h3>Large (lg)</h3>
    <CornSlider id="slider3" name="slider3" size="lg" label="Adjust the Corn Slider:" />

    <h3>Extra Large (xl)</h3>
    <CornSlider id="slider4" name="slider4" size="xl" label="Adjust the Corn Slider:" />

    <h3>Disabled</h3>
    <CornSlider id="slider5" name="slider5" label="Adjust the Corn Slider:" disabled />
  </div>
);
