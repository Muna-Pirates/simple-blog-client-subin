import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/graphql' : 'https://pirates.munawiki.dev/graphql',
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