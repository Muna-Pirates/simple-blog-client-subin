import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://pirates.munawiki.dev/graphql',
  documents: ['src/**/*.{ts,tsx,graphql}'],
  generates: {
    './src/lib/graphql/': {
      overwrite: true,
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    }
  },
  ignoreNoDocuments: true,
};

export default config;