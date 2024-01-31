import { Camera, Euler, Vector3 } from 'three';
import * as I from '../types/typedefs/cameras.typedef.js';
import { any } from '@leonardorick/utils';

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
  const coordinates = getCameraCoordinates();
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

  if (any([px, py, pz])) {
    localStorage.setItem('camera.position.x', camera.position.x);
    localStorage.setItem('camera.position.y', camera.position.y);
    localStorage.setItem('camera.position.z', camera.position.z);
  }
  const { x: rx, y: ry, z: rz } = camera.rotation;

  if (any([rx, ry, rz])) {
    localStorage.setItem('camera.rotation.x', camera.rotation.x);
    localStorage.setItem('camera.rotation.y', camera.rotation.y);
    localStorage.setItem('camera.rotation.z', camera.rotation.z);
  }
}

/**
 * get camera coordinates
 * @param {Camera} camera if a camera is sent we get the coordinates
 * of the camera. If not, we get from local storage and if it's
 * not defined, it returns undefined on each property 'position' and
 * 'rotation'
 * @returns {I.ICameraCoordinates}
 */
export function getCameraCoordinates(camera) {
  if (camera) {
    return {
      position: camera.position.clone(),
      rotation: camera.rotation.clone(),
    };
  }

  const coordinates = { position: undefined, rotation: undefined };
  const px = loadFromLocalStorage('camera.position.x');
  const py = loadFromLocalStorage('camera.position.y');
  const pz = loadFromLocalStorage('camera.position.z');

  const rx = loadFromLocalStorage('camera.rotation.x');
  const ry = loadFromLocalStorage('camera.rotation.y');
  const rz = loadFromLocalStorage('camera.rotation.z');

  if (any([px, py, pz])) {
    coordinates.position = new Vector3(px, py, pz);
  }

  if (any([rx, ry, rz])) {
    coordinates.rotation = new Euler(rx, ry, rz, 'XYZ');
  }

  return coordinates;
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

/**
 * load from localStorage
 * @param {string} key
 */
function loadFromLocalStorage(key) {
  const item = localStorage.getItem(key);
  return item ? parseFloat(item) : undefined;
}
