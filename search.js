const puppeteer=require('puppeteer');

async function searchWikipedia(url, searchTerm){

    try{
        const browser=await puppeteer.launch({headless:false});
        const page=await browser.newPage();
        await page.goto(url);
        await page.focus('input[name="search"]');
        await page.keyboard.type(searchTerm);
        await page.keyboard.press('Enter');
        await page.waitForNavigation({waitUntil:'networkidle2'});
        await page.screenshot({path:'search.png'});
       await browser.close();

    }
    
    catch(err){
        console.log('Error:',err);
    }
}

const url="https://www.wikipedia.org/";
const query="cat";

searchWikipedia(url,query);