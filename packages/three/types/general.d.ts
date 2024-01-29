import { Scene } from 'three';
import { WebGLRenderer } from 'three';
import { Camera } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export interface IgetRendererSceneCanvasOptions {
  width?: number;
  height?: number;
  allowFullScreen?: boolean;
  antialias?: boolean;
  powerPreference?: string;
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

export function glsl(x: string): string;
