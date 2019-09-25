import React from 'react';
import { storiesOf } from '@storybook/react';
import Comp from '@/index.tsx'

storiesOf('demos', module)
  .add('lib', () => <Comp />);