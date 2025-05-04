/* 1.title
   2. heading(h1) tags
   3. screenshot of full page
   4. pdf
    */

const puppeteer=require('puppeteer');

(async()=>{
    
    const browser=await puppeteer.launch({headless: 'false',});

    const page=await browser.newPage();
    try {
        await page.goto('https://en.wikipedia.org/wiki/Cat', {
          waitUntil: 'networkidle0',
          timeout: 60000,
        });

        const title=await page.title();
        console.log('Title:',title);

        const heading=await page.$eval('h1',el=>el.innerText);
        console.log('Heading:',heading);

    await page.screenshot({path:'page.png',fullPage:true});
    await page.pdf({path:'page.pdf',format:'A4'});
    }
    catch(err){
        console.log('Error:',err);        

    }

    await browser.close();   
})();