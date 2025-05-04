const puppeteer = require('puppeteer');

async function checkBrokenUrls() {
    try{
    const browser=await puppeteer.launch({headless:false});
    const page=await browser.newPage();

    const links=['https://httpstat.us/404', 'https://httpstat.us/500', 'https://httpstat.us/200',"https://example.com/this-page-does-not-exist","https://jsonplaceholder.typicode.com/invalid-endpoint"];
    const brokenUrls=[];

    for(const link of links){
        const response=await page.goto(link, {waitUntil:'networkidle2'});
        if(response.status()>=400){
            brokenUrls.push({url, status: response.status()});
    }
    }
    console.log('Broken URLs:', brokenUrls);
    await browser.close();

    }
    catch (error) {
        console.error('Error launching browser:', error);
        return;
    }

}
checkBrokenUrls();