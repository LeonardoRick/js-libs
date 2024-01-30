import { PerspectiveCamera } from 'three';
import { loadCameraCoordinates, saveCameraCoordinates } from '../src/cameras';

describe('loadCameraCoordinates ::', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  fit('should load the camera position from localStorage', () => {
    localStorage.setItem('camera.position.x', 1000);
    localStorage.setItem('camera.rotation.z', 0.9);

    const camera = new PerspectiveCamera();
    camera.position.x = 10;
    const coord = loadCameraCoordinates(camera);

    expect(coord.position.x).toEqual(1000);
    expect(camera.position.x).toEqual(1000);

    // we need to round because Euler sometimes add a minimal decimal
    expect(Math.round(coord.rotation.z * 100000) / 100000).toEqual(0.9);
    expect(Math.round(camera.rotation.z * 100000) / 100000).toEqual(0.9);
  });

  it('should return the camera position if a camera is sent and there is nothing on localStorage', () => {
    const camera = new PerspectiveCamera();
    camera.position.x = 10;
    const coordinates = loadCameraCoordinates(camera);

    expect(coordinates.position.x).toEqual(10);
  });
});

describe('saveCameraCoordinates ::', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save the camera position in localStorage as string', () => {
    const camera = new PerspectiveCamera();
    camera.position.x = 10;
    camera.position.y = 20;
    camera.position.z = 42;

    camera.rotation.x = 100;
    camera.rotation.y = 210;
    camera.rotation.z = 314;
    saveCameraCoordinates(camera);
    expect(localStorage.getItem('camera.position.x')).toEqual('10');
    expect(localStorage.getItem('camera.position.y')).toEqual('20');
    expect(localStorage.getItem('camera.position.z')).toEqual('42');

    expect(localStorage.getItem('camera.rotation.x')).toEqual('100');
    expect(localStorage.getItem('camera.rotation.y')).toEqual('210');
    expect(localStorage.getItem('camera.rotation.z')).toEqual('314');
  });
});
