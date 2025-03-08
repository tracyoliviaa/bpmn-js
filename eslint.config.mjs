import bpmnIoPlugin from 'eslint-plugin-bpmn-io';

const files = {
  ignored: [
    'dist',
    'coverage'
  ],
  build: [
    'test/config/*.js',
    'tasks/**/*.mjs',
    '*.js',
    '*.mjs'
  ],
  test: [
    'test/**/*.js'
  ]
};

export default [
  {
    ignores: files.ignored
  },

  // build
  ...bpmnIoPlugin.configs.node.map(config => {
    return {
      ...config,
      files: files.build
    };
  }),

  // lib + test
  ...bpmnIoPlugin.configs.browser.map(config => {
    return {
      ...config,
      ignores: files.build
    };
  }),

  // test
  ...bpmnIoPlugin.configs.mocha.map(config => {
    return {
      ...config,
      files: files.test,
    };
  }),

  // Test environment with globals
  {
    languageOptions: {
      env: {
        browser: true // Set the environment to browser to allow window, document, etc.
      },
      globals: {
        sinon: true,
        require: true, // Global for RequireJS
        window: 'readonly' // Explicitly mark window as a readonly global
      }
    },
    files: files.test
  } // Remove trailing spaces here
];
