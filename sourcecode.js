const puppeteer=require('puppeteer' );
const fs=require('fs');

async function getSourceCode(url,filepath){
    const browser=await puppeteer.launch({headless:false});

    const page=await browser.newPage();
    try{
        await page.goto(url);

        const sourceCode= await page.content();
        fs.writeFileSync(filepath,sourceCode,"utf-8");
        await browser.close();

    }
    catch(err){
        console.log('Error:',err);
    }
}
const url="https://en.wikipedia.org/wiki/Cat";
const filepath='sourcecode.html';

getSourceCode(url,filepath);
