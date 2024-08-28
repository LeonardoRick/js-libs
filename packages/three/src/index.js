import {
  // general - ESSENTIALS
  getRendererSceneCanvas,
  setFullScreenListener,
  setupDefaultCameraAndScene,
  getDefaultCamera,
  setResizeListener,
  updateRendererSizeRatio,
  // general - ANIMATION
  applyOrbitControl,
  loopAnimation,
  minimalSetup,
  // general
  isWebglSupported,
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

import { glsl, replaceShaderImport } from './shaders.js';

import { isDirectionalLight, isMesh } from './type-guards.js';

export default {
  // general - ESSENTIALS
  getRendererSceneCanvas,
  setFullScreenListener,
  setupDefaultCameraAndScene,
  getDefaultCamera,
  setResizeListener,
  updateRendererSizeRatio,

  // general - ANIMATION
  applyOrbitControl,
  loopAnimation,
  minimalSetup,

  // general
  isWebglSupported,

  // cameras - CAMERAS
  loadCameraCoordinates,
  saveCameraCoordinates,
  setCameraCoordinates,
  getCameraCoordinates,
  // cameras - CONTROLS
  loadControlsPosition,
  saveControlsPosition,
  getControlsPosition,

  // shaders
  glsl,
  replaceShaderImport,

  // type guards
  isMesh,
  isDirectionalLight,
};

// re-export named exports
export * from './cameras.js';
export * from './general.js';
export * from './shaders.js';
export * from './type-guards.js';
