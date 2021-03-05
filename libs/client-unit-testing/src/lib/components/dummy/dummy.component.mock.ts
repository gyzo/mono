import { Component } from '@angular/core';

/**
 * Dummy component.
 * Mostly used for mocking in specs.
 * Can be used when designing routing.
 */
@Component({
  selector: 'app-dummy-component',
  template: ` <span appAutoscroll>dummy component</span>
    <input appAutofocus value="input" />`,
})
export class AppDummyComponent {}
