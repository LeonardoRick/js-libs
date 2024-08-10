import { Scene, PerspectiveCamera, WebGLRenderer, Camera, Mesh, BoxGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as I from '../types/typedefs/general.typedef.js';

/******************************************
 * ESSENTIALS
 ******************************************/

/**
 *
 * @param {string} canvasId
 * @param {I.IgetRendererSceneCanvasOptions} options
 * @returns {I.IgetRendererSceneCanvasReturnType}
 */
export function getRendererSceneCanvas(
  canvasId,
  {
    width = window.innerWidth,
    height = window.innerHeight,
    allowFullScreen = true,
    applyCanvasStyle = true,
    styles = {},
    /**
     * renderer options
     */
    // allow transparent background
    alpha = true,
    // antialias affects performance but gives a better rendering
    antialias = false,
    // powerPreference options: 'high-performance' | 'low-power' | 'default'
    powerPreference = 'default',
  } = {}
) {
  const canvas = document.getElementById(canvasId);
  const renderer = new WebGLRenderer({ canvas, antialias, powerPreference, alpha });
  const scene = new Scene();
  updateRendererSizeRatio(renderer, width, height);

  const fullScreenHandler = allowFullScreen ? setFullScreenListener(canvas) : () => {};

  // apply styles on the canvas so it fills the screen
  if (applyCanvasStyle) {
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.outline = 'none';
    canvas.style.padding = 0;
    canvas.style.margin = 0;
  }

  for (const [key, value] of Object.entries(styles)) {
    canvas.style[key] = value;
  }

  return { renderer, scene, canvas, fullScreenHandler };
}

/**
 *
 * @param {HTMLCanvasElement} canvas
 * @returns {() => void} handler to be removed later if needed
 */
export function setFullScreenListener(canvas) {
  const handler = () => {
    if (!document.fullscreenElement) {
      canvas.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  canvas.addEventListener('dblclick', handler);
  return handler;
}

/**
 *
 * @param {Scene} scene
 * @param {WebGLRenderer} renderer
 * @param {I.IsetupDefaultCameraAndSceneOptions} options
 * @returns {{camera: Camera, resizeHandler: () => void}}
 */
export function setupDefaultCameraAndScene(
  scene,
  renderer,
  {
    mesh = null,
    resize = true,
    width = window.innerWidth,
    height = window.innerHeight,
    camera = null,
    near = 0.1,
    far = 2000,
    resizeCallback = () => {},
  } = {}
) {
  const _camera = camera || new PerspectiveCamera(75, width / height, near, far);
  _camera.position.z = 3;
  if (mesh) {
    _camera.lookAt(mesh.position);
    scene.add(mesh);
  }
  scene.add(_camera); // https://github.com/mrdoob/three.js/issues/1046
  renderer.render(scene, _camera);
  const resizeHandler = resize
    ? setResizeListener(_camera, renderer, { resizeCallback })
    : () => {};
  return { camera: _camera, resizeHandler };
}

/**
 *
 * @param {Camera} camera
 * @param {WebGLRenderer} renderer
 * @param {I.IsetResizeListenerOptions} options
 * @returns {() => void} resizehandler to be removed later if needed
 */
export function setResizeListener(
  camera,
  renderer,
  { composer = null, resizeCallback = () => {} } = {}
) {
  const handler = () => {
    resizeCallback({ renderer });
    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    // after updating camera we need to notify the camera to update the matrix
    camera.updateProjectionMatrix();

    // Update renderer
    updateRendererSizeRatio(renderer, window.innerWidth, window.innerHeight);
    // if we have an effect composers we should udpate its size as well
    if (composer) {
      updateRendererSizeRatio(composer, window.innerWidth, window.innerHeight);
    }
  };
  window.addEventListener('resize', handler);
  return handler;
}

/**
 *
 * @param {Renderer} renderer
 * @param {number} width
 * @param {number} height
 */
export function updateRendererSizeRatio(renderer, width, height) {
  renderer.setSize(width, height);
  // some devices can have a pixelRatio of 5 and this costs too mutch to render because this means that each
  // pixel should process 5 virtual pixels inside of it. Since the human eye can't detect much information above
  // a pixel ratio of 2, we set this as our limit
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

/******************************************
 * ANIMATION
 ******************************************/

/**
 *
 * @param {Camera} camera
 * @param {HTMLCanvasElement} canvas
 * @param {WebGLRenderer} renderer
 * @param {Scene} scene
 * @param {animationCallback: Function, handleOnlyCanvasEvents: boolean} options
 * @returns {{controls: OrbitControls, animationid: number}}
 */
export function applyOrbitControl(
  camera,
  canvas,
  renderer,
  scene,
  { animationCallback = () => {}, handleOnlyCanvasEvents = false } = {}
) {
  const controls = new OrbitControls(camera, handleOnlyCanvasEvents ? canvas : document.body);
  controls.enableDamping = true;
  controls.update();
  // controls.update is required inside animation frame
  //if controls.enableDamping or controls.autoRotate are set to true
  const animationId = loopAnimation(renderer, scene, camera, () => {
    controls.update();
    animationCallback({ renderer, scene, camera });
  });
  return { controls, animationId };
}

/**
 * allow objects and camera to have its properties re-rendered on the screen when some value change.
 * this should be called everywhere because for screen resizing to do not distort our object,
 * it need to rerender the scene
 * @param {WebGLRenderer} renderer
 * @param {Scene} scene
 * @param {Camera} camera
 * @param {Function} callback
 * @returns {number} animation id so we can call cancelAnimationFrame(animationId) in the future
 */
export function loopAnimation(renderer, scene, camera, callback = () => {}) {
  const animate = () => {
    callback({ renderer, scene, camera });
    renderer.render(scene, camera);
    return window.requestAnimationFrame(animate);
  };
  return animate();
}

/**
 *
 * @param {I.IminimalSetupOptions} options
 * @returns {I.IminimalSetupReturnType}
 */

export function minimalSetup({
  canvasId = 'webgl',
  mesh = null,
  enableOrbitControl = true,
  orbitControlHandleOnlyCanvasEvents = false,
  // keep animationCallback as undefined so applyOrbitControl
  // can override it with an empty function when nothing passed
  animationCallback = undefined,
  resizeCallback = undefined,

  addMeshOnScene = true,
  allowFullScreen = true,
  /**
   * getRendererSceneCanvas options
   */
  alpha = true,
  applyCanvasStyle = true,
  styles = {},
  // antialias affects performance but gives a better rendering
  antialias = false,
  // powerPreference options: 'high-performance' | 'low-power' | 'default'
  powerPreference = 'default',
} = {}) {
  let controls;
  let animationId;
  const { renderer, scene, canvas, fullScreenHandler } = getRendererSceneCanvas(canvasId, {
    alpha,
    antialias,
    applyCanvasStyle,
    styles,
    powerPreference,
    allowFullScreen,
  });
  const { camera, resizeHandler } = setupDefaultCameraAndScene(scene, renderer, { resizeCallback });

  // if orbit control is enabled, apply orbit control and animation callback.
  // if not, check if we have an animationCallback to apply it alone
  if (enableOrbitControl) {
    ({ controls, animationId } = applyOrbitControl(camera, canvas, renderer, scene, {
      animationCallback,
      handleOnlyCanvasEvents: orbitControlHandleOnlyCanvasEvents,
    }));
  } else if (animationCallback) {
    animationId = loopAnimation(renderer, scene, camera, animationCallback);
  }

  mesh = mesh || new Mesh(new BoxGeometry(1, 1, 1));
  mesh.material.color?.setHex(0xff0000);
  if (addMeshOnScene) {
    scene.add(mesh);
  }

  renderer.render(scene, camera);
  return {
    renderer,
    scene,
    canvas,
    camera,
    mesh,
    controls,
    animationId,
    fullScreenHandler,
    resizeHandler,
  };
}

/**
 * Type guard to check if an object is of type THREE.Mesh
 * @param {THREE.Object3D} object
 * @returns {boolean}
 */
export function isMesh(object) {
  return object?.type === 'Mesh';
}
