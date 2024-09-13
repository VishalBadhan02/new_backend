const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');


const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

const scrapeEmails = async (url) => {
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options())
        .build();

    try {
        await driver.get(`${url}`);

        let pageSource = await driver.getPageSource();

        // Extract emails using the regular expression
        let emails = pageSource.match(emailPattern) || [];

        return emails;
    } catch (err) {
        console.error('An error occurred while scraping:', err);
        return [];
    }

    finally {
        await driver.quit();
    }
};

module.exports = { scrapeEmails };
