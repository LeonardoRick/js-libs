import type { Camera, Euler, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export interface ICameraCoordinates {
  position: Vector3;
  rotation: Euler;
}

export function loadCameraCoordinates(camera: Camera): ICameraCoordinates;

export function loadControlsPosition(controls: OrbitControls): Vector3;

export function saveCameraCoordinates(camera: Camera): void;

export function saveControlsPosition(controls: OrbitControls): void;

export function setCameraCoordinates(
  camera: Camera,
  coordinates: ICameraCoordinates
): ICameraCoordinates;

export function getCameraCoordinates(camera?: Camera): ICameraCoordinates;
0;
export function getControlsPosition(controls: OrbitControls): Vector3;
