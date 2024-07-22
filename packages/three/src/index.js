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

  // general - TYPE CHECKERS
  isMesh,
} from './general.js';

import {
  // cameras  - CAMERAS
  loadCameraCoordinates,
  saveCameraCoordinates,
  setCameraCoordinates,
  getCameraCoordinates,
  // cameras - CONTROLS
  loadControlsPosition,
  saveControlsPosition,
  getControlsPosition,
} from './cameras.js';

// loaders
import { asyncGltfLoader } from './loaders.js';

import { glsl, replaceShaderImport } from './shaders.js';

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

  // general - TYPE CHECKERS
  isMesh,

  // cameras - CAMERAS
  loadCameraCoordinates,
  saveCameraCoordinates,
  setCameraCoordinates,
  getCameraCoordinates,
  // cameras - CONTROLS
  loadControlsPosition,
  saveControlsPosition,
  getControlsPosition,

  // loaders
  asyncGltfLoader,

  // shaders
  glsl,
  replaceShaderImport,
};

// re-export named exports
export * from './cameras.js';
export * from './general.js';
export * from './shaders.js';
export * from './loaders.js';
