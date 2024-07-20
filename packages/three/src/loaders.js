import { GLTFLoader } from 'three/examples/jsm//loaders/GLTFLoader';

const gltfLoader = new GLTFLoader();

/**
 * this utility function allows you to use any three.js
 * loader with promises and async/await
 * @param {string} url
 * @returns {Promise<import('../types/interfaces/GLTF').GLTF>}
 */
export async function asyncGltfLoader(url) {
  return new Promise((resolve, reject) => {
    gltfLoader.load(url, (data) => resolve(data), null, reject);
  });
}
