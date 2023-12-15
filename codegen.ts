import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: "https://simple-blog.munawiki.dev/graphql",
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/lib/graphql/': {
      overwrite: true,
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    }
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;