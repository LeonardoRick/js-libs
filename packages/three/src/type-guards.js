import { Object3D, Light, DirectionalLight } from 'three';
/**
 * Type guard to check if an object is of type THREE.Mesh
 * @param {Object3D} object
 * @returns {boolean}
 */
export function isMesh(object) {
  return object?.type === 'Mesh';
}

/**
 * type guard to check if a light is of type THREE.DirectionalLight
 * @param {Light} object
 * @returns {boolean}
 */
export function isDirectionalLight(object) {
  return object?.isLight && object instanceof DirectionalLight;
}
