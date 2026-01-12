export default [
  {
    ignores: ['dist/', 'node_modules/', '*.config.*'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
  },
];
