export default {
  cjs: 'rollup',
  esm: 'rollup',
  umd: false,
  nodeResolveOpts: {
    mainFields: ['module', 'browser', 'main'],
  },
  // yarn build order
  pkgs: [
    'g-math',
    'g',
    'g-layout-blocklike',
    'g-plugin-dragndrop',
    'g-plugin-dom-interaction',
    'g-plugin-mobile-interaction',
    'g-plugin-css-select',
    'g-plugin-canvas-renderer',
    'g-plugin-canvas-picker',
    'g-plugin-html-renderer',
    'g-canvas',
    'g-plugin-svg-renderer',
    'g-plugin-svg-picker',
    'g-svg',
    'g-plugin-device-renderer',
    'g-plugin-webgl-device',
    'g-plugin-webgpu-device',
    'g-webgl',
    'g-webgpu',
    'g-mobile-canvas-element',
    'g-mobile-canvas',
    'g-mobile-svg',
    'g-mobile-webgl',
    'g-plugin-3d',
    'g-plugin-control',
    'g-plugin-gpgpu',
    'g-plugin-physx',
    'g-plugin-box2d',
    'g-plugin-matterjs',
    'g-plugin-yoga',
    'g-plugin-rough-canvas-renderer',
    'g-plugin-rough-svg-renderer',
    'g-components',
    'g-web-components',
    'react-g',
  ],
};
