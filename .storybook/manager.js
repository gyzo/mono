import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'dark',
  brandTitle: 'Rfprod mono',
});

addons.setConfig({
  panelPosition: 'bottom',
  theme,
});
