import { glsl, replaceShaderImport } from '../src/shaders';

describe('replaceShaderImport ::', () => {
  it('replaceShaderImport', () => {
    const snoise = `
        float snoise(vec3 v){}
    `;
    const vertex = `
        uniform __import__snoise; // this line will be replaced by the function
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `;
    const fragment = `
        void main() {
            //  gl_FragColor = vec4(vUv, 0.0, 1.0);
                gl_FragColor = vec4(vColor, 1);
            }
    `;
    const modules = { snoise };
    const vertexShader = replaceShaderImport(vertex, modules);
    const fragmentShader = replaceShaderImport(fragment, modules);
    expect(vertexShader).toContain(snoise);
    expect(fragmentShader).not.toContain(snoise);
  });
});

describe('glsl ::', () => {
  it('should return the same string but formated on VSCode', () => {
    const x = glsl`
        uniform uTime
    `;
    expect(x).toContain('uniform uTime');
  });
});
