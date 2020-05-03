let usersIfo = []
let userFullName = ""
let profilesPath = []
let numberOfUsers = 0

describe('Get email', () => {
    Cypress.Cookies.preserveOnce('li_at', 'remember_token')
    before(() => {
        cy.visit('https://www.linkedin.com/mynetwork/invite-connect/connections/')
        cy.get('.t-18.t-black.t-normal').then(users => {
            numberOfUsers = parseInt(users.text())
            console.log(numberOfUsers);
        })
        cy.visit('https://www.linkedin.com/search/results/people/?facetNetwork=%5B%22F%22%5D&origin=FACETED_SEARCH')
    })
    it('getting all contact urls', () => {
        // cy.visit('https://www.linkedin.com/')
        // cy.get('.nav__button-secondary').click()
        // cy.get('#username').focus().type('izak270@gmail.com')
        // cy.get('#password').focus().type('Qazsedc1556')
        // cy.get('.btn__primary--large').click()

        for (let i = 0; i <= numberOfUsers/10; i++) {
            cy.get('li.list-style-none> * .mn-connection-card__picture').last().focus()
            cy.get('li.list-style-none> * .mn-connection-card__picture').first().focus()
            cy.get('li.list-style-none> * .mn-connection-card__picture').last().focus()
            cy.get('li.list-style-none> * .mn-connection-card__picture').last().focus()
            cy.wait(7000)
        }
        cy.get('li.list-style-none> * .mn-connection-card__picture')
            .each(($el) => {
                cy.wrap($el)
                    .should('have.attr', 'href')
                    .then(lid => {
                        profilesPath.push(lid)
                    })
            }).then(() => {
                console.log(profilesPath);
                
                cy.writeFile('cypress/fixtures/profiles-path.json', { profilesPath })
            })

    })
    it.skip('getting all contacts details', () => {
        cy.fixture('profiles-path.json').then((profile) => {
            for (let i = 0; i < profile.paths.length; i++) {
                console.log(profile.paths[i]);
                // cy.visit('https://www.linkedin.com/')
                // cy.get('.nav__button-secondary').click()
                // cy.get('#username').focus().type('izak270@gmail.com')
                // cy.get('#password').focus().type('Qazsedc1556')
                // cy.get('.btn__primary--large').click()
                cy.visit('https://www.linkedin.com' + profile.paths[i], { failOnStatusCode: false });
                cy.get('a[data-control-name=contact_see_more]').click()
                cy.get('.artdeco-modal.artdeco-modal--layer-default', { timeout: 10000 }).then((body) => {
                    if (body.find('.ci-email a.pv-contact-info__contact-link').length > 0) {
                        cy.get('#pv-contact-info').then(userName => {
                            userFullName = userName.text()
                        })
                        cy.get('.ci-email a.pv-contact-info__contact-link').invoke('attr', 'href')
                            .then(userEmail => {
                                let userDetail = {
                                    'first name': userFullName.split(' ')[6],
                                    'last name': userFullName.split(' ')[7].split('\n')[0],
                                    'email': userEmail.slice(7)
                                }
                                usersIfo.push(userDetail)
                            })
                        console.log('succses' + usersIfo);
                    }
                    else {
                        console.log('no mail' + usersIfo);
                    }
                });
            }
            cy.writeFile('cypress/fixtures/full-details.json', { usersIfo })

        })
    })
    // it('json5', () => {
    //     cy.visit('https://docs.cypress.io/api/commands/contains.html#Content')
    // })

})