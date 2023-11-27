import { CodegenConfig } from '@graphql-codegen/cli';
import { API_BASE_URL } from './src/config'

const config: CodegenConfig = {
  schema: API_BASE_URL,
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
  watch: true
};

export default config;