let usersIfo = []
let userFullName = ""

describe('Get email', () => {
    Cypress.Cookies.preserveOnce('li_at', 'remember_token')

    it.skip('getting all contact urls', () => {
        cy.visit('https://www.linkedin.com/')
        cy.get('.nav__button-secondary').click()
        cy.get('#username').focus().type('izak270@gmail.com')
        cy.get('#password').focus().type('Qazsedc1556')
        cy.get('.btn__primary--large').click()
        cy.visit('https://www.linkedin.com/mynetwork/invite-connect/connections/')
        for (let i = 0; i < 1; i++) {
            cy.get('li.list-style-none> * .mn-connection-card__picture').last().focus()
            cy.get('li.list-style-none> * .mn-connection-card__picture').first().focus()
            cy.get('li.list-style-none> * .mn-connection-card__picture').last().focus()
            cy.get('li.list-style-none> * .mn-connection-card__picture').last().focus().wait(7000)
        }
        cy.get('li.list-style-none> * .mn-connection-card__picture')
            .each(($el) => {
                cy.wrap($el)
                    .invoke('attr', 'href')
                    .then(lid => {
                        profiles.push(lid)
                    })
            }).then(() => {
                cy.writeFile('cypress/fixtures/profiles.json', { profiles })
            })

    })
    it('getting all contacts emails', () => {
        cy.fixture('profiles.json').then((profiles) => {
            for (let i = 0; i < profiles.profiles.length; i++) {
                console.log(profiles.profiles[i]);
                cy.visit('https://www.linkedin.com' + profiles.profiles[i], { failOnStatusCode: false });
                cy.get('a[data-control-name=contact_see_more]').click()
                cy.wait(2000)
                cy.get('body').then((body) => {
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
                        console.log('fail' + usersIfo);
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