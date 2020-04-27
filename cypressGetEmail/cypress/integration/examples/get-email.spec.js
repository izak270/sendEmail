let users = []

describe('Get email', () => {
    Cypress.Cookies.preserveOnce('li_at', 'remember_token')

    it.skip('first email', () => {
        // cy.visit('https://www.linkedin.com/')
        // cy.get('.nav__button-secondary').click()
        // cy.get('#username').focus().type('izak270@gmail.com')
        // cy.get('#password').focus().type('Qazsedc1556')
        // cy.get('.btn__primary--large').click()
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
                cy.writeFile('cypress/fixtures/profiles.json',{profiles})
            })

    })
    it('json', () => {
        cy.fixture('profiles.json').then((profiles)  => {
            // const profilesss = profiles;
            // cy.writeFile('cypress/fixtures/profiles.json',{name:'amin'})
            // console.log(profiles);
            
            for(let i = 0;i<profiles.profiles.length;i++){
                console.log(profiles.profiles[i]);
                cy.visit('https://www.linkedin.com'+profiles.profiles[i]);
                cy.get('a[data-control-name=contact_see_more]').click()
                cy.get('.ci-email a.pv-contact-info__contact-link').invoke('attr', 'href')
                .then(lid => {
                    users.push(lid)})
                console.log(users);
                //todo if cant find email
                
            }

            // for(let i = 0; i<3;i++){
            //     console.log(name.profiles[i]);    
            // }
        })


        


    })

})