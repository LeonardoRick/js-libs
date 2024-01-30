import type { Camera, Euler, Vector3 } from 'three';

export interface ICameraCoordinates {
  position: Vector3;
  rotation: Euler;
}
export function loadCameraCoordinates(camera: Camera): ICameraCoordinates;

export function saveCameraCoordinates(camera: Camera): void;

export function setCameraCoordinates(
  camera: Camera,
  coordinates: ICameraCoordinates
): ICameraCoordinates;
