import type { GLTF } from './interfaces/GLTF';

/**
 * this utility function allows you to use any three.js
 * loader with promises and async/await
 */
export async function asyncGltfLoader(url: string): Promise<GLTF>;
