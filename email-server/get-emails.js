const puppeteer = require('puppeteer');
const fs = require('fs');
require('dotenv').config();


(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 200
    });
    const page = await browser.newPage();

    await page.setCookie({
        'name': 'li_at',
        'value': process.env.COOKIE,
        'domain': '.www.linkedin.com'
    })

    await page.goto('https://www.linkedin.com/search/results/people/?facetNetwork=%5B%22F%22%5D&origin=FACETED_SEARCH');
    await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
    });

    const userPath = []
    const pagesNumber = await page.evaluate(() => document.querySelectorAll('li.artdeco-pagination__indicator')['9'].textContent);
    for (let i = 0; i <= pagesNumber - pagesNumber; i++) {

        const data = await page.evaluate(
            () => Array.from(
                document.querySelectorAll('.search-result__image-wrapper a[data-control-name=search_srp_result]'),
                a => a.getAttribute('href')
            )
        );
        for (let path of data) {
            userPath.push(path)
        }
        'https://www.linkedin.com/search/results/people/?facetNetwork=%5B%22F%22%5D&origin=FACETED_SEARCH&page=' + (i + 2)
        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight);
        });        
    }
    fs.writeFileSync('profiles-path.json', JSON.stringify({ userPath }));
    const usersPaths = require("./profiles-path.json");

    const usersIfo = []
    for (let user of usersPaths.userPath) {
        await page.goto('https://www.linkedin.com' + user + 'detail/contact-info/');
        const checkUserFullName = await page.evaluate(() => document.querySelector('#pv-contact-info'));
        const checkIfExists = await page.evaluate(() => document.querySelector('.ci-email a.pv-contact-info__contact-link'));
        if (checkIfExists && checkUserFullName) {
            const userFullName = await page.evaluate(() => document.querySelector('#pv-contact-info').textContent);
            const userEmail = await page.evaluate(() => document.querySelector('.ci-email a.pv-contact-info__contact-link').textContent);
            const userDetail = {
                'firstName': userFullName.split(' ')[6],
                'lastName': userFullName.split(' ')[7].split('\n')[0],
                'email': userEmail.split('\n')[1].split(' ')[10]
            }
            usersIfo.push(userDetail)
        }
        console.log(usersIfo.length);
    };
    fs.writeFileSync('details.json', JSON.stringify({ usersIfo }));
    await browser.close();
})();