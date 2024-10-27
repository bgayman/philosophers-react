import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://philosophersapi.com/graphql",
  documents: "src/**/*.{ts,tsx}",  // Simplify pattern to include .ts and .tsx files
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],  // Keep the default plugins for `client` preset
      presetConfig: {
        fragmentMasking: false
      }
    }
  }
};

export default config;