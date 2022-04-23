const fs = require('fs');
const puppeteer = require('puppeteer');
const { buildPathHtml, buildPathPdf } = require('./buildPaths');

const printPdf = async () => {
	console.log('Starting: Generating PDF Process, Kindly wait ..');
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`file:${buildPathHtml}`, { waitUntil: 'networkidle0' })
	const pdf = await page.pdf({
		format: 'A4',
		margin: {
			top: '20px',
			right: '20px',
			bottom: '20px',
			left: '20px'
		}
	});
	await browser.close();
	console.log('Ending: Generating PDF Process');
	return pdf;
};

const init = async () => {
	try {
		const pdf = await printPdf();
		fs.writeFileSync(buildPathPdf, pdf);
		console.log('Succesfully created an PDF table');
	} catch (error) {
		console.log('Error generating PDF', error);
	}
};

init();
