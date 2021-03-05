import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'advancedStencil',
  plugins: [
    sass()
  ],
  outputTargets: [
    {
      type: 'dist'
    }
  ]
};
