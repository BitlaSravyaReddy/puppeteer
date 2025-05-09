const puppeteer=require('puppeteer');
const fs=require('fs');

async function extractData(urls){
    try{
        const browser= await puppeteer.launch({headless:false});
        const scrapingurl=urls.map(async(url)=>{
            const page=await browser.newPage();
            await page.goto(url);
            const data=await page.evaluate(()=>{
                const title=document.querySelector('h1').textContent.trim();
                const para=document.querySelector('p').textContent.trim();  

                return {title,para};
            });
            await page.close();
            return data;
        })
        const results=await Promise.all(scrapingurl);
        await browser.close();

        fs.writeFileSync('extractedData.json',JSON.stringify(results));


    }
    catch(err){
        console.error('Error in extractData:', err);
    }
}
let urls=['https://en.wikipedia.org/wiki/Cat','https://en.wikipedia.org/wiki/Dog','https://en.wikipedia.org/wiki/Elephant','https://en.wikipedia.org/wiki/Lion','https://en.wikipedia.org/wiki/Tiger'];

extractData(urls);