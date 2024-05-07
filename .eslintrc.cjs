module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true 
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',  // Adding React recommendations
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    'react',  // Ensure the React plugin is properly listed
    '@typescript-eslint'
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-unused-vars': ['error', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
    'react/jsx-uses-react': 'off', // Since React 17 JSX Transform
    'react/react-in-jsx-scope': 'off', // Since React 17 JSX Transform
    'eqeqeq': ['error', 'always'],  // Enforce strict equality '==='
    '@typescript-eslint/explicit-module-boundary-types': 'warn' // Require explicit return types on functions and class methods
  },
  settings: {
    react: {
      version: 'detect' // Automatically detect the react version
    }
  }
};
