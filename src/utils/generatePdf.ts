import { FIREFOX_PATH } from '@config';
import puppeteer from 'puppeteer';

/**
 * This function return the max web page height
 *
 * @function
 * @returns height of web page
 */
const docHeight = () => {
  const body = document.body;
  const html = document.documentElement;
  return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
};

/**
 *this function converts hmtl into pdf
 *
 * @param htmlText pdf content.
 * @param fileDestinationName name of the pdf file for saving
 * @returns pdf
 */
async function generatePdf(htmlText: string, fileDestinationName: string) {
  // TODO: need to intitalize browser only once
  const browser = await puppeteer.launch({ headless: true, executablePath: FIREFOX_PATH, product: 'firefox' });
  const page = await browser.newPage();
  await page.setContent(htmlText, { waitUntil: 'domcontentloaded' });
  const pageHeight = await page.evaluate(docHeight);
  const pdf = await page.pdf({
    path: fileDestinationName,
    height: `${pageHeight + 85}px`,
  });
  await page.close();
  // TODO: need to close browser only when server stops.
  await browser.close();
  return pdf;
}
export default generatePdf;
