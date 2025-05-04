const puppeteer=require('puppeteer');

(async()=>{
    const browser=await puppeteer.launch();
    const page=await browser.newPage();

    const longitude=-122.4194;
    const latitude=37.7749;

    await page.browserContext().overridePermissions('https://browserleaks.com/', ['geolocation']);
    await page.setGeolocation({latitude,longitude});
    await page.goto('https://browserleaks.com/' );
    await page.screenshot({path:'geolocation.png'});
    
    const coordinates = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('table tr'));
        const latRow = rows.find(row => row.textContent.includes('Latitude'));
        const lonRow = rows.find(row => row.textContent.includes('Longitude'));
    
        const latitude = latRow?.querySelector('td:last-child')?.innerText.trim();
        const longitude = lonRow?.querySelector('td:last-child')?.innerText.trim();
    
        return { latitude, longitude };
      });
    
      console.log('Extracted coordinates:', coordinates);

    await browser.close();
    

})();