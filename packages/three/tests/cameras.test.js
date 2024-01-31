import { Euler, PerspectiveCamera } from 'three';
import { getCameraCoordinates, loadCameraCoordinates, saveCameraCoordinates } from '../src/cameras';

describe('loadCameraCoordinates ::', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should load the camera position from localStorage', () => {
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

  it('should save camera position even if its 0', () => {
    const camera = new PerspectiveCamera();
    camera.position.set(0, 0, 0);
    camera.setRotationFromEuler(new Euler(0, 0, 0, 'XYZ'));

    saveCameraCoordinates(camera);

    expect(localStorage.getItem('camera.position.x')).toEqual('0');
    expect(localStorage.getItem('camera.position.y')).toEqual('0');
    expect(localStorage.getItem('camera.position.z')).toEqual('0');
    expect(localStorage.getItem('camera.rotation.x')).toEqual('0');
    expect(localStorage.getItem('camera.rotation.y')).toEqual('0');
    expect(localStorage.getItem('camera.rotation.z')).toEqual('0');
  });
});

describe('getCameraCoordinates ::', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('should get coordinates from a camera if passed', () => {
    const camera = new PerspectiveCamera();
    localStorage.setItem('camera.position.x', 1000);
    camera.position.x = 10;
    camera.rotation.y = 0.5;
    const coordinates = getCameraCoordinates(camera);
    expect(coordinates.position.x).toEqual(10);
    expect(coordinates.rotation.y).toEqual(0.5);
  });

  it('should get coordinates from localStorage if camera is not passed', () => {
    localStorage.setItem('camera.position.y', 1000);
    localStorage.setItem('camera.position.z', 200);

    localStorage.setItem('camera.rotation.x', 10);
    localStorage.setItem('camera.rotation.z', 12);

    const coordinates = getCameraCoordinates();

    expect(coordinates.position.x).toEqual(0);
    expect(coordinates.position.y).toEqual(1000);
    expect(coordinates.position.z).toEqual(200);
    expect(coordinates.rotation.x).toEqual(10);
    expect(coordinates.rotation.y).toEqual(0);
    expect(coordinates.rotation.z).toEqual(12);
  });

  it('should get coordinates from localStorage even if values are 0', () => {
    localStorage.setItem('camera.position.y', 0);
    localStorage.setItem('camera.position.z', 0);

    localStorage.setItem('camera.rotation.x', -6);
    localStorage.setItem('camera.rotation.z', 0);

    const coordinates = getCameraCoordinates();

    expect(coordinates.position.y).toEqual(0);
    expect(coordinates.position.z).toEqual(0);

    expect(coordinates.rotation.x).toEqual(-6);
    expect(coordinates.rotation.z).toEqual(0);
  });
});
