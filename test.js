const puppeteer = require ('puppeteer');

(async () => {
//   const browser = await puppeteer.launch();
console.log('chalraha1')
//   const browser = await puppeteer.launch({executablePath: '/usr/bin/chromium',args:["--no-sandbox"]});
  const browser = await puppeteer.launch({executablePath: '/usr/bin/firefox',
    // headless:false,
    // args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    product:'firefox'
});
console.log('chalraha2')
  const page = await browser.newPage();
  console.log('chalraha')

  await page.goto('https://perpetualblock.io');
  console.log('chalgaya')
  // Type into search box.
  await page.type('.devsite-search-field', 'Headless Chrome');

  // Wait for suggest overlay to appear and click "show all results".
  const allResultsSelector = '.devsite-suggest-all-results';
  await page.waitForSelector(allResultsSelector);
  await page.click(allResultsSelector);

  // Wait for the results page to load and display the results.
  const resultsSelector = '.gsc-results .gs-title';
  await page.waitForSelector(resultsSelector);

  // Extract the results from the page.
  const links = await page.evaluate(resultsSelector => {
    return [...document.querySelectorAll(resultsSelector)].map(anchor => {
      const title = anchor.textContent.split('|')[0].trim();
      return `${title} - ${anchor.href}`;
    });
  }, resultsSelector);

  // Print all the files.
  console.log(links.join('\n'));

  await browser.close();
})();