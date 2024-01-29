import { Camera } from 'three';

export function saveCameraCoordinates(camera: Camera): void;

export function loadCameraCoordinates(camera: Camera): { position: Vector3; rotation: Vector3 };
