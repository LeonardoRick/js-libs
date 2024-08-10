import type { Scene, Camera, WebGLRenderer, Mesh, WebGLRenderer } from 'three';
import type { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface IgetRendererSceneCanvasOptions {
  width?: number;
  height?: number;
  alpha?: number;
  applyCanvasStyle?: boolean;
  styles?: object;
  allowFullScreen?: boolean;
  antialias?: boolean;
  powerPreference?: string;
}

export interface IgetRendererSceneCanvasReturnType {
  renderer: WebGLRenderer;
  scene: Scene;
  canvas: HTMLCanvasElement;
  fullScreenHandler: () => void;
}

interface IresizeCallbackOptions {
  renderer: WebGLRenderer;
}

interface IAnimationCallbackOptions {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: Camera;
}

export interface IsetupDefaultCameraAndSceneOptions {
  mesh?: Mesh;
  resize?: boolean;
  width?: number;
  height?: number;
  camera?: Camera;
  near?: number;
  far?: number;
  resizeCallback?: (options: IresizeCallbackOptions) => void;
}

interface IresizeCallbackOptions {
  renderer: WebGLRenderer;
}
export interface IminimalSetupOptions {
  canvasId?: string;
  mesh?: Mesh;
  enableOrbitControl?: boolean;
  orbitControlHandleOnlyCanvasEvents?: boolean;
  animationCallback?: (options: IAnimationCallbackOptions) => void;
  resizeCallback?: (options: IresizeCallbackOptions) => void;
  alpha?: boolean;
  applyCanvasStyle?: boolean;
  styles?: Object;
  addMeshOnScene?: boolean;
  allowFullScreen?: boolean;
  // antialias affects performance but gives a better rendering
  antialias?: boolean;
  // powerPreference options: 'high-performance' | 'low-power' | 'default'
  powerPreference?: 'default' | 'lower-power' | 'high-performance';
}

export interface IminimalSetupReturnType {
  renderer: WebGLRenderer;
  scene: Scene;
  canvas: HTMLCanvasElement;
  camera: Camera;
  mesh: Mesh;
  fullScreenHandler: () => void;
  resizeHandler: () => void;
  controls?: OrbitControls;
  animationid?: number;
}

/******************************************
 * ESSENTIALS
 ******************************************/
export function getRendererSceneCanvas(
  canvasId: string,
  options?: IgetRendererSceneCanvasOptions
): IgetRendererSceneCanvasReturnType;

export function setFullScreenListener(canvas: HTMLCanvasElement): () => void;

export function setupDefaultCameraAndScene(
  scene: Scene,
  renderer: WebGLRenderer,
  options?: IsetupDefaultCameraAndSceneOptions
): { camera: Camera; resizeHandler: () => void };

export function setResizeListener(
  camera: Camera,
  renderer: WebGLRenderer,
  composer?: EffectComposer
): () => void;

export function updateRendererSizeRatio(
  renderer: WebGLRenderer,
  width: number,
  height: number
): void;

/******************************************
 * ANIMATION
 ******************************************/

export function applyOrbitControl(
  camera: Camera,
  canvas: HTMLCanvasElement,
  renderer: WebGLRenderer,
  scene: Scene,
  options?: { animationCallback?: Function; handleOnlyCanvasEvents?: boolean }
): { controls: OrbitControls; animationId: number };

export function loopAnimation(
  renderer: WebGLRenderer,
  scene: Scene,
  camera: Camera,
  callback?: (options: IAnimationCallbackOptions) => void
): number;

export function minimalSetup(options?: IminimalSetupOptions): IminimalSetupReturnType;

export function isMesh(object?: Object3D): object is Mesh;
