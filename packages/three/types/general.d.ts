import type { Scene, Camera, WebGLRenderer } from 'three';
import type { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export interface IgetRendererSceneCanvasOptions {
  width?: number;
  height?: number;
  alpha?: number;
  allowFullScreen?: boolean;
  antialias?: boolean;
  powerPreference?: string;
  applyCanvasStyle?: boolean;
}

export interface IgetRendererSceneCanvasReturnType {
  render: WebGLRenderer;
  scene: Scene;
  canvas: HTMLCanvasElement;
}

export interface IsetupDefaultCameraAndSceneOptions {
  mesh?: Mesh;
  resize?: boolean;
  width?: number;
  height?: number;
  camera?: Camera;
  near?: number;
  far?: number;
}

export interface IminimalSetupOptions {
  canvasId?: string;
  mesh?: Mesh;
  enableOrbitControl?: boolean;
  animationCallback?: Function;
  alpha?: boolean;
}

export interface IminimalSetupReturnType {
  renderer: WebGLRenderer;
  scene: Scene;
  canvas: HTMLCanvasElement;
  camera: Camera;
  mesh: Mesh;
  controls: OrbitControls;
}

/******************************************
 * ESSENTIALS
 ******************************************/
export function getRendererSceneCanvas(
  canvasId: string,
  options?: IgetRendererSceneCanvasOptions
): IgetRendererSceneCanvasReturnType;

export function setFullScreenListener(canvas: HTMLCanvasElement): void;

export function setupDefaultCameraAndScene(
  scene: Scene,
  renderer: WebGLRenderer,
  options?: IsetupDefaultCameraAndSceneOptions
): Camera;

export function setResizeListener(
  camera: Camera,
  renderer: WebGLRenderer,
  composer?: EffectComposer
): void;

export function updateRendererSizeRatio(renderer: Renderer, width: number, height: number): void;

/******************************************
 * ANIMATION
 ******************************************/

export function applyOrbitControl(
  camera: Camera,
  canvas: HTMLCanvasElement,
  renderer: WebGLRenderer,
  scene: Scene,
  animationCallback?: Function
): OrbitControls;

export function loopAnimation(
  renderer: WebGLRenderer,
  scene: Scene,
  camera: Camera,
  callback?: Function
): void;

export function minimalSetup(options?: IminimalSetupOptions): IminimalSetupReturnType;
