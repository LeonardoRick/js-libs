import { Camera, Euler, Vector3 } from 'three';
import * as I from '../types/typedefs/cameras.typedef.js';

/**
 * load from localStorage
 * @param {string} key
 */
function loadFromLocalStorage(key) {
  const item = localStorage.getItem(key);
  return item ? parseFloat(item) : undefined;
}
/**
 * load camera coordinates from localStorage
 * @param {Camera} camera if present, and the localStorage
 * contains the camera position saved, the coordinates are
 * applied on the camera.
 * If nothing is found in the local storage, we return
 * the camera coordinates itself
 * @returns {I.ICameraCoordinates}
 * Vector3 coodinations that can be applied to
 * position and rotation of the camera
 */
export function loadCameraCoordinates(camera) {
  const coordinates = { position: undefined, rotation: undefined };
  const px = loadFromLocalStorage('camera.position.x');
  const py = loadFromLocalStorage('camera.position.y');
  const pz = loadFromLocalStorage('camera.position.z');

  const rx = loadFromLocalStorage('camera.rotation.x');
  const ry = loadFromLocalStorage('camera.rotation.y');
  const rz = loadFromLocalStorage('camera.rotation.z');

  if ([px, py, pz].find((value) => value !== undefined)) {
    coordinates.position = new Vector3(px, py, pz);
  }

  if ([rx, ry, rz].find((value) => value !== undefined)) {
    coordinates.rotation = new Euler(rx, ry, rz, 'XYZ');
  }

  if (camera) {
    return setCameraCoordinates(camera, coordinates);
  }

  return coordinates;
}

/**
 * Save camera coordinates in localStorage
 * @param {Camera} camera
 */
export function saveCameraCoordinates(camera) {
  const { x: px, y: py, z: pz } = camera.position;
  if ([px, py, pz].find((value) => value !== undefined)) {
    localStorage.setItem('camera.position.x', camera.position.x);
    localStorage.setItem('camera.position.y', camera.position.y);
    localStorage.setItem('camera.position.z', camera.position.z);
  }
  const { x: rx, y: ry, z: rz } = camera.rotation;

  if ([rx, ry, rz].find((value) => value !== undefined)) {
    localStorage.setItem('camera.rotation.x', camera.rotation.x);
    localStorage.setItem('camera.rotation.y', camera.rotation.y);
    localStorage.setItem('camera.rotation.z', camera.rotation.z);
  }
}

/**
 * set coordinates (position and rotation) of a camera
 * @param {Camera} camera
 * @param {I.ICameraCoordinates} coordinates
 * @returns {I.ICameraCoordinates} new coordinates of the camera
 */
export function setCameraCoordinates(camera, { position, rotation }) {
  if (position) {
    const { x, y, z } = position;
    camera.position.set(x, y, z);
  }

  if (rotation) {
    camera.setRotationFromEuler(rotation);
  }

  return {
    position: camera.position,
    rotation: camera.rotation,
  };
}
