
const puppeteer=require('puppeteer');

(async()=>{
     
    const browser=await puppeteer.launch({headless:false});
    const page=await browser.newPage();
    try{
        await page.goto('url.com');
          //code snippets

    }catch(err){
        console.log('Error:',err);        
    }

  
    await browser.close();   


})();