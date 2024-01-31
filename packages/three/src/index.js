import {
  // general - ESSENTIALS
  getRendererSceneCanvas,
  setFullScreenListener,
  setupDefaultCameraAndScene,
  setResizeListener,
  updateRendererSizeRatio,
  // general - ANIMATION
  applyOrbitControl,
  loopAnimation,
  minimalSetup,
} from './general.js';

import {
  loadCameraCoordinates,
  saveCameraCoordinates,
  setCameraCoordinates,
  getCameraCoordinates,
} from './cameras.js';
import { glsl, replaceShaderImport } from './shaders.js';

export {
  // general - ESSENTIALS
  getRendererSceneCanvas,
  setFullScreenListener,
  setupDefaultCameraAndScene,
  setResizeListener,
  updateRendererSizeRatio,
  // general - ANIMATION
  applyOrbitControl,
  loopAnimation,
  minimalSetup,

  // cameras
  loadCameraCoordinates,
  saveCameraCoordinates,
  setCameraCoordinates,
  getCameraCoordinates,

  // shaders
  glsl,
  replaceShaderImport,
};

export default {
  // general - ESSENTIALS
  getRendererSceneCanvas,
  setFullScreenListener,
  setupDefaultCameraAndScene,
  setResizeListener,
  updateRendererSizeRatio,

  // general - ANIMATION
  applyOrbitControl,
  loopAnimation,
  minimalSetup,

  // cameras
  loadCameraCoordinates,
  saveCameraCoordinates,
  setCameraCoordinates,
  getCameraCoordinates,

  // shaders
  glsl,
  replaceShaderImport,
};
