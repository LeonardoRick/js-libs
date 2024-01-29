/**
 * Used to simulate a function import on a shader, since .glsl don't allow us to import one file to another.
 * To see examples check the tests
 * @param {string} shader
 * @param {{IMPORT_TEMPLATE: string, modules: { [key: string]: string}}} options
 * @returns the final shader with the function imported
 */
export function replaceShaderImport(
  shader,
  { IMPORT_TEMPLATE = 'uniform __import__{{module}};', modules = {} } = {}
) {
  return Object.entries(modules).reduce((acum, [name, mod]) => {
    return acum.replace(IMPORT_TEMPLATE.replace('{{module}}', name), mod);
  }, shader);
}

/**
 * used to format template literals on glsl and show a
 * formatted string by the extension glsl-literal
 * @param {string} x
 * @returns string with recognized glsl synax by the ide
 * example:
 * const vShader = glsl`...(shader WebGL code here)`
 */
export const glsl = (x) => x[0];
