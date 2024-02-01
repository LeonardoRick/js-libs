import { Camera, Euler, Vector3 } from 'three';
import * as I from '../types/typedefs/cameras.typedef.js';
import { any } from '@leonardorick/utils';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
 * load controls target position
 * @param {OrbitControls} controls
 * @returns {Vector3} position
 */
export function loadControlsPosition(controls) {
  const position = getControlsPosition();
  if (controls) {
    return setPosition(controls.target, position);
  }
  return position;
}
/**
 * Save camera coordinates in localStorage
 * @param {Camera} camera
 */
export function saveCameraCoordinates(camera) {
  const { x: px, y: py, z: pz } = camera.position;

  if (any([px, py, pz])) {
    setLocalStorageCoordinate(camera.position, 'camera', 'position');
  }
  const { x: rx, y: ry, z: rz } = camera.rotation;

  if (any([rx, ry, rz])) {
    setLocalStorageCoordinate(camera.rotation, 'camera', 'rotation');
  }
}

/**
 * Save controls target position
 * @param {OrbitControls} controls
 */
export function saveControlsPosition(controls) {
  const { x, y, z } = controls.target;
  if (any([x, y, z])) {
    setLocalStorageCoordinate(controls.target, 'controls', 'position');
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

  const { x: px, y: py, z: pz } = getLocalStorageCoordinate('camera', 'position');
  const { x: rx, y: ry, z: rz } = getLocalStorageCoordinate('camera', 'rotation');

  if (any([px, py, pz])) {
    coordinates.position = new Vector3(px, py, pz);
  }

  if (any([rx, ry, rz])) {
    coordinates.rotation = new Euler(rx, ry, rz, 'XYZ');
  }

  return coordinates;
}

/**
 * get controls target position
 * @param {OrbitControls} controls
 * @returns {Vector3} position
 */
export function getControlsPosition(controls) {
  if (controls) {
    return controls.target;
  }
  const { x, y, z } = getLocalStorageCoordinate('controls', 'position');
  if (any([x, y, z])) {
    return new Vector3(x, y, z);
  }
  // default controls.target
  return new Vector3(0, 0, 0);
}
/**
 * set coordinates (position and rotation) of a camera
 * @param {Camera} camera
 * @param {I.ICameraCoordinates} coordinates
 * @returns {I.ICameraCoordinates} new coordinates of the camera
 */
export function setCameraCoordinates(camera, { position, rotation }) {
  setPosition(camera.position, position);

  if (rotation) {
    camera.setRotationFromEuler(rotation);
  }

  return {
    position: camera.position.clone(),
    rotation: camera.rotation.clone(),
  };
}

/**
 * set vector3 position
 * @param {Vector3} vector
 * @param {Vector3} position
 */
function setPosition(vector, position) {
  if (position) {
    const { x, y, z } = position;
    vector.set(x, y, z);
  }
  return vector;
}

/**
 * set coordinate from local storage
 * @param {{x: number, y: number, z: number}} coordinates
 * @param {'camera' | 'controls'} object
 * @param {'position' | 'rotation'} type
 */
function setLocalStorageCoordinate({ x, y, z }, object = 'camera', type = 'position') {
  localStorage.setItem(`${object}.${type}.x`, x);
  localStorage.setItem(`${object}.${type}.y`, y);
  localStorage.setItem(`${object}.${type}.z`, z);
}
/**
 * get coordinate from local storage
 * @param {'camera' | 'controls'} object
 * @param {'position' | 'rotation'} type
 * @returns {{x: number, y: number, z: number}} position
 */
function getLocalStorageCoordinate(object = 'camera', type = 'position') {
  return {
    x: loadFromLocalStorage(`${object}.${type}.x`),
    y: loadFromLocalStorage(`${object}.${type}.y`),
    z: loadFromLocalStorage(`${object}.${type}.z`),
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
