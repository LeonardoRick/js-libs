/**
 * used to format template literals on glsl and show a
 * formatted string by the extension glsl-literal
 * @param {string} x
 * @returns string with recognized glsl synax by the ide
 * example:
 * const vShader = glsl`...(shader WebGL code here)`
 */
export const glsl = (x) => x[0];

/**
 * Used to simulate a function import on a shader, since .glsl don't allow us to import one file to another.
 * To see examples check the tests
 * @param {string} shader
 * @param {{ [key: string]: string}} modules with key as the name of the object that will be replaced
 * by the correspondent file
 * @param {{IMPORT_TEMPLATE: string }} options
 * @returns the final shader with the function imported
 */
export function replaceShaderImport(
  shader,
  modules,
  { IMPORT_TEMPLATE = 'uniform __import__{{module}};' } = {}
) {
  return Object.entries(modules).reduce((acum, [name, mod]) => {
    return acum.replace(IMPORT_TEMPLATE.replace('{{module}}', name), mod);
  }, shader);
}
