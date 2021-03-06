import { OverlayContainer } from '@angular/cdk/overlay';
import { Provider } from '@angular/core';

export const overlayContainerMock: Provider = {
  provide: OverlayContainer,
  useValue: {
    getContainerElement: () => ({
      classList: {
        add: (): null => null,
        remove: (): null => null,
      },
    }),
  },
};
