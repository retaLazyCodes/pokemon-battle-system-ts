/**
 * Custom ES Module Loader for ts-node with tsconfig-paths integration.
 *
 * This custom loader enables support for TypeScript path aliases defined in your tsconfig.json
 * when running Node.js in ESM mode with ts-node.
 *
 * How it works:
 *  - Uses `ts-node`'s native ESM hooks to handle TypeScript transpilation on the fly.
 *  - Uses `tsconfig-paths` to resolve path aliases (e.g., '@core/*' -> './src/core/*').
 *  - Resolves the specifier to a valid file URL for Node.js ESM loader.
 *
 * Exported hooks:
 *  - `resolve`: Custom resolve hook that checks for path aliases first.
 *  - `getFormat`: Uses ts-node to determine the format (module or commonjs).
 *  - `transformSource`: Uses ts-node to transpile TypeScript to JavaScript.
 *  - `load`: Loads the transpiled module.
 *
 * Usage:
 *  node --loader ./loader.js --experimental-specifier-resolution=node ./scripts/test-battle.ts
 *
 * Requirements:
 *  - "ts-node" must be installed.
 *  - "tsconfig-paths" must be installed.
 *  - Your tsconfig.json must define `baseUrl` and `paths` for path aliases.
 *
 * Notes:
 *  - This loader only affects modules that use path aliases.
 *  - Specifiers without matching aliases are resolved normally by ts-node.
 */


import {
    resolve as resolveTs,
    getFormat,
    transformSource,
    load,
} from "ts-node/esm";
import * as tsConfigPaths from "tsconfig-paths";
import { pathToFileURL } from 'url';

export { getFormat, transformSource, load };

const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig();
const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths);

export function resolve (specifier, context, defaultResolve) {
    const match = matchPath(specifier);
    return match
        ? resolveTs(pathToFileURL(`${match}`).href, context, defaultResolve)
        : resolveTs(specifier, context, defaultResolve);
}
