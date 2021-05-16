import { Overlay, OverlayConfig, OverlayContainer, OverlayRef } from '@angular/cdk/overlay';
import { Provider } from '@angular/core';

export class AppOverlayRefMock {
  public hasAttached(): boolean {
    return false;
  }

  public attach(): boolean {
    return true;
  }

  public detach(): boolean {
    return true;
  }
}

export const overlayRefMockProviders: Provider[] = [
  {
    provide: Overlay,
    useValue: {
      create: (config?: OverlayConfig | undefined): OverlayRef => {
        return new AppOverlayRefMock() as unknown as OverlayRef;
      },
      position: () => ({
        global: () => ({
          top: () => null,
        }),
      }),
    },
  },
  {
    provide: OverlayContainer,
    useValue: {
      getContainerElement: () => ({
        classList: {
          add: (): null => null,
          remove: (): null => null,
        },
        appendChild: (): null => null,
      }),
    },
  },
  {
    provide: OverlayRef,
    useClass: AppOverlayRefMock,
  },
];
