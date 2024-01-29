import { Camera, Vector3 } from 'three';

/**
 * load camera coordinates from localStorage
 * @param {Camera} camera
 * @returns {position: Vector3, rotation: Vector3}
 * Vector3 coodinations that can be applied to
 * position and rotation of the camera
 */
export function loadCameraCoordinates(camera) {
  const coordinates = {};
  const px = parseFloat(localStorage.getItem('camera.position.x'));
  const py = parseFloat(localStorage.getItem('camera.position.y'));
  const pz = parseFloat(localStorage.getItem('camera.position.z'));

  if (px ?? py ?? pz) {
    coordinates.position = new Vector3(px, py, pz);
    if (camera) {
      camera.position.x = px;
      camera.position.y = py;
      camera.position.z = pz;
    }
  }

  const rx = parseFloat(localStorage.getItem('camera.rotation.x'));
  const ry = parseFloat(localStorage.getItem('camera.rotation.y'));
  const rz = parseFloat(localStorage.getItem('camera.rotation.z'));
  if (rx ?? ry ?? rz) {
    coordinates.rotation = new Vector3(rx, ry, rz);
    if (camera) {
      camera.rotation.x = rx;
      camera.rotation.y = ry;
      camera.rotation.z = rz;
    }
  }
  return coordinates;
}

/**
 * Save camera coordinates in localStorage
 * @param {Camera} camera
 */
export function saveCameraCoordinates(camera) {
  if (camera.position.x || camera.position.x === 0) {
    localStorage.setItem('camera.position.x', camera.position.x);
    localStorage.setItem('camera.position.y', camera.position.y);
    localStorage.setItem('camera.position.z', camera.position.z);
  }
  if (camera.rotation.x || camera.rotation.x === 0) {
    localStorage.setItem('camera.rotation.x', camera.rotation.x);
    localStorage.setItem('camera.rotation.y', camera.rotation.y);
    localStorage.setItem('camera.rotation.z', camera.rotation.z);
  }
}
