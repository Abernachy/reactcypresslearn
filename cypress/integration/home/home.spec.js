describe("Home page", () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it("header contains recipe heading with a message that there aints no recipes", () => {
    cy.findByRole('heading').should('contain', 'My Recipes')
    cy.get('p')
    .findByText('There are no recipes to list.')
    .should('exist')
  })

  it("contains an Add Recipes button below the My Recipes heading that when clicked opens a form", ()=> {
    // Find the button and click it
    cy.findByRole('button').click();

    //Get a form element and look for a button to see if it exist
    cy.get('form')
      .findByRole('button')
      .should('exist')
  })

  it("Contains a form with fields 'Recipe Name' and 'Recipe Instructions' after clicking the 'Add Recipe' button",() => {
    cy.findByRole('button').click();
    expect(cy.findByRole('textbox', {name: /Recipe name/i})).toExist()
    cy.findByRole('textbox', {name: /instructions/i}).should('exist')

  })

  it("displays a recipe name under the 'My Recipes' heading after it has been added through the 'Add Recipe' form", () => {
    const recipeName = 'Tofu Scramble Tacos';
    cy.findByRole('button').click();
    cy.findByRole('textbox', {name: /Recipe name/i}).type(recipeName)
    cy.findByRole('textbox', {name: /instructions/i}).type("1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas")
    
    return cy.findByRole('button').click()
    .then(() => {
      expect(cy.findByRole('listitem', /tofu scramble tacos/i )).toExist();
    })
  })


})