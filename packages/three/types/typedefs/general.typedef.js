import { WebGLRenderer, Scene, Mesh, Camera } from 'three';

/**
 * @typedef {Object} IgetRendererSceneCanvasOptions
 * @property {number} width
 * @property {number} height
 * @property {boolean} allowFullScreen
 * @property {boolean} antialias
 * @property {string} powerPreference
 */

/**
 * @typedef {Object} IgetRendererSceneCanvasReturnType
 * @property {WebGLRenderer} render
 * @property {Scene} scene
 * @property {HTMLCanvasElement} canvas
 */

/**
 * @typedef {Object} IsetupDefaultCameraAndSceneOptions
 * @property {Mesh} mesh
 * @property {boolean} resize
 * @property {number} width
 * @property {number} height
 * @property {Camera} camera
 * @property {number} near
 * @property {number} far
 */

/**
 * @typedef {Object} IminimalSetupOptions
 * @property {string} canvasId
 * @property {Mesh} mesh
 * @property {boolean} enableOrbitControl
 * @property {Function} animationCallback
 */

/**
 * @typedef {Object} IminimalSetupReturnType
 * @property {WebGLRenderer} renderer
 * @property {Scene} scene
 * @property {HTMLCanvasElement} canvas
 * @property {Camera} camera
 * @property {Mesh} mesh
 * @property {OrbitControls} controls
 */
