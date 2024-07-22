import { WebGLRenderer, Scene, Mesh, Camera } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';

/**
 * @typedef {Object} IgetRendererSceneCanvasOptions
 * @property {number} width
 * @property {number} height
 * @property {boolean} alpha
 * @property {boolean} allowFullScreen
 * @property {boolean} antialias
 * @property {string} powerPreference
 * @property {boolean} applyCanvasStyle
 */

/**
 * @typedef {Object} IgetRendererSceneCanvasReturnType
 * @property {WebGLRenderer} render
 * @property {Scene} scene
 * @property {HTMLCanvasElement} canvas
 * @property {() => void} fullScreenHandler
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
 * @property {({renderer: WebGLRenderer}) => void}} resizeCallback
 */

/**
 * @typedef {Object} IresizeCallback
 * @property {({WebGLRenderer} renderer) => void} callback
 */

/**
 * @typedef {Object} IsetResizeListenerOptions
 * @property {EffectComposer} composer
 * @property {{resizeCallback: IresizeCallback}} options
 */
/**
 * @typedef {Object} IminimalSetupOptions
 * @property {string} canvasId
 * @property {Mesh} mesh
 * @property {boolean} enableOrbitControl
 * @property {Function} animationCallback
 * @property {Function} resizeCallback
 * @property {boolean} alpha
 * @property {boolean} addMeshOnScene
 * @property {boolean} allowFullScreen
 * antialias affects performance but gives a better rendering
 * @property {boolean} antialias
 * powerPreference options: 'high-performance' | 'low-power' | 'default'
 * @property {'high-performance' | 'lower-power' | 'default'} powerPreference,
 */

/**
 * @typedef {Object} IminimalSetupReturnType
 * @property {WebGLRenderer} renderer
 * @property {Scene} scene
 * @property {HTMLCanvasElement} canvas
 * @property {Camera} camera
 * @property {Mesh} mesh
 * @property {OrbitControls | undefined} controls
 * @property {number} animationId
 * @property {() => void} fullScreenHandler
 * @property {() => void} resizeHandler
 */
