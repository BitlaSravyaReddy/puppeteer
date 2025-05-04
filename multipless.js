const puppeteer=require('puppeteer');

let devices=[puppeteer.KnownDevices['iPhone X'],puppeteer.KnownDevices['Pixel 2'],puppeteer.KnownDevices['iPad'],puppeteer.KnownDevices['Galaxy S5'], puppeteer.KnownDevices['iPad Mini'], puppeteer.KnownDevices['Nexus 5X'], puppeteer.KnownDevices['Galaxy Note 3']];

(async() => {
    const browser=await puppeteer.launch({headless:false});
    const page= await browser.newPage();
    for(let device of devices){
        await page.emulate(device);
        await page.goto('https://en.wikipedia.org/wiki/Cat',{waitUntil:'networkidle2'});
        await page.screenshot({path:`${device.name}.png`});
    }
    await browser.close();
})();