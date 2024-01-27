import { Scene, PerspectiveCamera, WebGLRenderer, Camera, Mesh, BoxGeometry } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
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
    // antialias affects performance but gives a better rendering
    antialias = false,
    // powerPreference options: 'high-performance' | 'low-power' | 'default'
    powerPreference = 'default',
  } = {}
) {
  const canvas = document.getElementById(canvasId);
  const renderer = new WebGLRenderer({ canvas, antialias, powerPreference });
  const scene = new Scene();
  updateRendererSizeRatio(renderer, width, height);
  allowFullScreen && setFullScreenListener(canvas);

  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.outline = 'none';
  return { renderer, scene, canvas };
}

/**
 *
 * @param {HTMLCanvasElement} canvas
 */
export function setFullScreenListener(canvas) {
  canvas.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
      canvas.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
}

/**
 *
 * @param {Scene} scene
 * @param {WebGLRenderer} renderer
 * @param {I.IsetupDefaultCameraAndSceneOptions} options
 * @returns {Camera}
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
  resize && setResizeListener(_camera, renderer);
  return _camera;
}

/**
 *
 * @param {Camera} camera
 * @param {WebGLRenderer} renderer
 * @param {EffectComposer} composer
 */
export function setResizeListener(camera, renderer, composer = null) {
  window.addEventListener('resize', () => {
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
  });
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

/**
 * used to format template literals on glsl and show a
 * formatted string by the extension glsl-literal
 * @param {string} x
 * @returns string with recognized glsl synax by the ide
 * example:
 * const vShader = glsl`...(shader WebGL code here)`
 */
export const glsl = (x) => x[0];

/******************************************
 * ANIMATION
 ******************************************/

/**
 *
 * @param {Camera} camera
 * @param {HTMLCanvasElement} canvas
 * @param {WebGLRenderer} renderer
 * @param {Scene} scene
 * @param {Function} animationCallback
 * @returns {OrbitControls}
 */
export function applyOrbitControl(camera, canvas, renderer, scene, animationCallback = () => {}) {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.update();
  // controls.update is required inside animation frame
  //if controls.enableDamping or controls.autoRotate are set to true
  loopAnimation(renderer, scene, camera, () => {
    controls.update();
    animationCallback();
  });
  return controls;
}

/**
 * allow objects and camera to have its properties re-rendered on the screen when some value change.
 * this should be called everywhere because for screen resizing to do not distort our object,
 * it need to rerender the scene
 * @param {WebGLRenderer} renderer
 * @param {Scene} scene
 * @param {Camera} camera
 * @param {Function} callback
 */
export function loopAnimation(renderer, scene, camera, callback = () => {}) {
  const animate = () => {
    callback();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  };
  animate();
}

/**
 *
 * @param {string} canvasId
 */

export function minimalSetup({ canvasId = 'webgl', mesh = null, applyOrbitControl = true } = {}) {
  const { renderer, scene, canvas } = getRendererSceneCanvas(canvasId);
  const camera = setupDefaultCameraAndScene(scene, renderer);
  if (applyOrbitControl) {
    applyOrbitControl(camera, canvas, renderer, scene);
  }
  const m = mesh || new Mesh(new BoxGeometry(1, 1, 1));
  m.material.color.setHex(0xff0000);
  scene.add(m);
  renderer.render(scene, camera);
  return {
    renderer,
    scene,
    canvas,
    camera,
    mesh,
  };
}
