import { Component } from '@angular/core';

/**
 * Testing component.
 * Mostly used for mocking in specs.
 * Can be used when designing routing.
 */
@Component({
  selector: 'app-testing-component',
  template: ` <span appAutoscroll>dummy component</span>
    <input appAutofocus value="input" />`,
})
export class AppTestingComponent {}
