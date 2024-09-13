// const openai = new OpenAI({ apiKey: "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" });

// async function main() {
//     const stream = await openai.chat.completions.create({
//         model: "gpt-4o",
//         messages: [{ role: "user", content: "\"Adesh Institute of Dental Sciences & Research, Baranala Road, Bathinda (Id: C-29246)\" classify this college into tier 1,2 and 3 in one word" }],
//     });
//     var output = response.choices[0].text.strip()
//     console.log(output)
// }

// main();
// const { Builder, By } = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');
// const options = new chrome.Options();

// // Uncomment the below line to run Chrome in headless mode
// options.addArguments('headless');

// async function extractUrls(driver, url, id) {
//     try {
//         await driver.get(url);

//         let elements = await driver.findElements(By.tagName('a'));

//         let urls = [];
//         for (let element of elements) {
//             let link = await element.getAttribute('href');
//             if (link) {
//                 urls.push(link);
//                 // await KarnatakaModel.findOneAndUpdate(
//                 //     { _id: id },
//                 //     { $push: { URL: link } }  // Correctly pushes the link into the URL array
//                 // );
//             }
//         }
//         console.log(`URLs from ${url}:`, urls);
//     } catch (error) {
//         console.error(`Error extracting URLs from ${url}:`, error);
//     }
// }

// async function main() {

//     let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

//     try {
//         // Assuming KarnatakaModel.find() is a function that fetches the data
//         const data = await KarnatakaModel.find();

//         // Iterate over the data and extract URLs for each website
//         for (let i = 0; i < data.length; i++) {
//             const url = data[i].Website;
//             const id = data[i]._id;
//             console.log(`Processing: ${url}`);
//             await extractUrls(driver, url, id);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     } finally {
//         // Quit the browser session after all URLs are processed
//         await driver.quit();
//     }
// }

// main();

// const puppeteer = require('puppeteer');

// const urlModule = require('url');

// const visitedUrls = new Set();
// const foundEmails = new Set();

// async function extractEmailsFromPage(page, url, id) {
//     try {

//         await page.goto(url, { waitUntil: 'load', timeout: 0 });

//         const pageContent = await page.content();

//         const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
//         const emails = pageContent.match(emailRegex);

//         if (emails) {
//             emails.forEach(email => foundEmails.add(email));
//         }

//         const links = await page.$$eval('a[href]', anchors => anchors.map(anchor => anchor.href));

//         for (let link of links) {
//             const resolvedUrl = urlModule.resolve(url, link);
//             const { hostname } = new URL(resolvedUrl);

//             // Visit only internal links within the same domain
//             if (!visitedUrls.has(resolvedUrl) && hostname === new URL(url).hostname) {
//                 visitedUrls.add(resolvedUrl);
//                 await extractEmailsFromPage(page, resolvedUrl);
//             }
//         }
//     } catch (error) {
//         console.error(`Error processing ${url}:`, error);
//     }
// }

// async function crawlWebsiteForEmails(homepageUrl, id) {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     try {
//         visitedUrls.add(homepageUrl);
//         await extractEmailsFromPage(page, homepageUrl, id);

//         console.log('Found emails here:', Array.from(foundEmails));
//     } finally {
//         await browser.close();
//     }
// }
// async function formail() {
//     const data = await KarnatakaModel.find();
//     for (let i = 0; i < 1; i++) {
//         let id = data[0]._id;
//         let URL = data[3].Filtered_url
//         for (let j = 0; j < URL.length; j++) {
//           await crawlWebsiteForEmails(URL[j]);
           
//         }

//     }
// }

// formail()





// URL Filtration





// Assume this is your array of URLs fetched from the database
// Define the function to filter URLs
// function filterUrlsFromDatabase(urls, keywords = ['tpo', 'placement', 'officer', 'contact', 'staff', 'directory', 'department']) {

//     const keywordPattern = new RegExp(keywords.join('|'), 'i');
//     const filteredUrls = urls.filter(url => keywordPattern.test(url));

//     return filteredUrls;
// }

// const urlFilter = async () => {
//     try {
//         const data = await KarnatakaModel.find();

//         if (data.length > 0) {
//             for (let i = 0; i < data.length; i++) {
//                 let URLs = data[i].URL;
//                 let id = data[i]._id;

//                 // Filter URLs for this specific document
//                 const filteredUrls = filterUrlsFromDatabase(URLs);

//                 // Update the document with the filtered URLs
//                 await KarnatakaModel.findOneAndUpdate(
//                     { _id: id },
//                     { $push: { Filtered_url: { $each: filteredUrls } } } // Using $each to push all filtered URLs at once
//                 );
//             }
//         }
//     } catch (error) {
//         console.error('Error fetching or filtering URLs:', error);
//     }
// };

// urlFilter();














// const axios = require('axios');
// const cheerio = require('cheerio');

// // Define the function to fetch and filter URLs
// const fetchAndFilterUrls = async (homepageUrl) => {
//     try {
//         // Step 1: Fetch the HTML content of the homepage
//         const { data } = await axios.get(homepageUrl);

//         // Step 2: Load HTML into cheerio for parsing
//         const $ = cheerio.load(data);

//         // Step 3: Extract all the URLs from anchor tags
//         const allUrls = [];
//         $('a').each((index, element) => {
//             const url = $(element).attr('href');
//             if (url && url.startsWith('http')) {  // Ensure it's a full URL
//                 allUrls.push(url);
//             }
//         });

//         // Step 4: Define the keywords for filtering
//         const keywords = ['tpo', 'placement', 'contact', 'staff', 'directory', 'officer', 'administration', 'faculty', 'team'];

//         // Step 5: Filter URLs based on keywords
//         const keywordPattern = new RegExp(keywords.join('|'), 'i');
//         const filteredUrls = allUrls.filter(url => keywordPattern.test(url));

//         // Step 6: Output the filtered URLs
//         console.log('Filtered URLs:', filteredUrls);

//         return filteredUrls;
//     } catch (error) {
//         console.error('Error fetching or filtering URLs:', error);
//     }
// };

// // Example usage
// const homepageUrl = 'https://www.dsu.edu.in/';
// fetchAndFilterUrls(homepageUrl);















// extrecting official links of colleges 






// const puppeteer = require('puppeteer');

// async function getCollegeWebsite(collegeName) {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     // Google search query with the college name
//     const searchQuery = `https://www.google.com/search?q=${encodeURIComponent(collegeName + ' official website')}`;

//     try {
//         // Navigate to Google search results page
//         await page.goto(searchQuery, { waitUntil: 'load', timeout: 1 });

//         // Extract the first search result link
//         const firstLink = await page.evaluate(() => {
//             const linkElement = document.querySelector('a');
//             return linkElement ? linkElement.href : null;
//         });

//         if (firstLink) {
//             console.log(`Official website for ${collegeName}: ${firstLink}`);
//         } else {
//             console.log(`Could not find the official website for ${collegeName}`);
//         }
//     } catch (error) {
//         console.error('Error occurred:', error);
//     } finally {
//         await browser.close();
//     }
// }

// // Example usage:
// const collegeName = 'Adichunchanagiri University';
// getCollegeWebsite(collegeName);



// const formData = require('form-data');
// const Mailgun = require('mailgun.js');
// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'f265500992f79cd3d4cb78f30f12dc59-2b755df8-9d554490'});

// const DOMAIN = 'your_domain_name'; // e.g. sandbox123.mailgun.org
// // const mg = mailgun({ apiKey: 'f265500992f79cd3d4cb78f30f12dc59-2b755df8-9d554490', domain: DOMAIN });


// mg.messages.create('sandbox1a2327de51704d699ace2f92730a7d6f.mailgun.org', {
//     from: "Excited User <vishal.badhan@academor.com>",
//     to: ["vishalbadhan81@gmail.com"],
//     subject: "Hello",
//     text: "Testing some Mailgun awesomness!",
//     html: "<h1>Testing some Mailgun awesomness!</h1>"
//   })
//   .then(msg => console.log(msg)) // logs response data
//   .catch(err => console.error(err)); // logs any error

