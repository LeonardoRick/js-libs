import type { Object3D, Object3DEventMap, Mesh, Light, DirectionalLight } from 'three';
/**
 * Type guard to check if an object is of type THREE.Mesh
 */
export function isMesh(object?: Object3D<Object3DEventMap>): object is Mesh;

/**
 * type guard to check if a light is of type THREE.DirectionalLight
 */
export function isDirectionalLight(light: Light): light is DirectionalLight {
  return object.isLight && object instanceof DirectionalLight;
}
