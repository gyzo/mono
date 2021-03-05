import { getGreeting } from '../support/app.po';

describe('portfolio', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    /**
     * @note TODO
     */
    expect(true).to.eq(true);
  });
});
