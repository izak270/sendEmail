const puppeteer = require('puppeteer');
const usersPaths = require("./profiles-path.json");
const fs = require('fs');




(async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    await page.setCookie({
        'name': 'li_at',
        'value': 'AQEDAS1sMQIBrti0AAABceCL2UoAAAFyBJhdSlYACFpcFqu1t1N38M3aYaT4ADwdzRsMPyi6-Tj4hj9taSTpHgbXa7jqaOYh0yNI8n6rlC2q5QZ64CavjL8SKo1slibDMAVcJGyT5mcXrx3W3miLY92j',
        'domain': '.www.linkedin.com'
    })
    const data = fs.readFileSync('details.json').toString()
    console.log(data);
    const usersIfo = []
    for (let user of usersPaths.paths) {
        await page.goto('https://www.linkedin.com' + user + 'detail/contact-info/');
        const userFullName = await page.evaluate(() => document.querySelector('#pv-contact-info'));
        const checkIfExists = await page.evaluate(() => document.querySelector('.ci-email a.pv-contact-info__contact-link'));
        if (checkIfExists && userFullName) {
            const userFullName = await page.evaluate(() => document.querySelector('#pv-contact-info').textContent);
            const userEmail = await page.evaluate(() => document.querySelector('.ci-email a.pv-contact-info__contact-link').textContent);
            const userDetail = {
                'first name': userFullName.split(' ')[6],
                'last name': userFullName.split(' ')[7].split('\n')[0],
                'email': userEmail.split('\n')[1].split(' ')[10]
            }
            usersIfo.push(userDetail)

        }
        
        console.log(usersIfo.length);


    };
    fs.writeFileSync('details.json', JSON.stringify({ usersIfo }));
    await browser.close();
})();