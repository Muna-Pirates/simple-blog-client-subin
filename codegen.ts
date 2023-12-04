import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://ec2-3-34-193-123.ap-northeast-2.compute.amazonaws.com:3000/graphql',
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