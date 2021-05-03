export = config;
/**
 *
 * @param {string} connection
 * @param {string} [fallback]
 * @param {string} override
 * @return {Promise<void>}
 */
declare function config(connection: string, fallback?: string, override?: string): Promise<void>;
