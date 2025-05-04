const puppeteer=require('puppeteer');

(async()=>{
     

    const browser= await puppeteer.launch({headless:false});
    const page=await browser.newPage();

    await page.goto("https://www.yahoo.com/",{ waitUntil: 'domcontentloaded' });
    await page.goto("https://finance.yahoo.com/", { waitUntil: 'domcontentloaded' });
    await page.screenshot({path:'yahoo-finance.png'});
    await page.goBack({ waitUntil: 'domcontentloaded' });

    const title=await page.title();
    console.log('Page title:',title);

    await page.goForward({ waitUntil: 'domcontentloaded' });

    await browser.close();



})();