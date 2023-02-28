module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@mui/*/*/*'],
      },
    ],
  },
};
