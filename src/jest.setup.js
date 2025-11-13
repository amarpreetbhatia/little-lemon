// This file runs before Jest loads any modules. Use it to mock native modules
// that may otherwise be required by dependencies and crash the test runner.

try {
  // If Jest is available, mock the 'canvas' module so native bindings aren't loaded.
  // Some libraries require('canvas') which pulls in a compiled .node binary.
  // Mapping + mock here should prevent the native module from being loaded.
  jest.mock("canvas", () => ({}));
} catch (e) {
  // Not running under Jest—ignore.
}
