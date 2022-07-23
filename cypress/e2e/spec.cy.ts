describe('My First Test', () => {
  it('clicks the link "type"', () => {
    cy.visit('http://localhost:3000/app/homePage');

    cy.contains('type').click();
  });
});
