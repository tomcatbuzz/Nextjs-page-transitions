/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: true 
      // Enabled by default in development, disabled in production to reduce file size,
      // setting this will override the default for all environments.
      // displayName: true,
      // Enabled by default.
      // ssr: true,
      // Enabled by default.
      // fileName?: boolean,
      // Empty by default.
      // topLevelImportPaths?: string[],
      // Defaults to ["index"].
      // meaninglessFileNames?: string[],
      // Enabled by default.
      // cssProp: true,
      // Empty by default.
      // namespace?: string,
      // Not supported yet.
      // minify?: boolean,
      // Not supported yet.
      // transpileTemplateLiterals?: boolean,
      // Not supported yet.
      // pure?: boolean,
    
  }
}

module.exports = nextConfig
