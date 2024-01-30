export function glsl(x: string): string;

export function replaceShaderImport(
  shader: string,
  modules: { [key: string]: string },
  options?: { IMPORT_TEMPLATE?: string }
): string;
