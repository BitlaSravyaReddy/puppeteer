const puppeteer=require('puppeteer');

async function interceptRequests(url){
    const browser=await puppeteer.launch({headless:false});
    const page=await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request',request=>{    
        if(request.resourceType() === 'image'){
            request.abort();
            console.log('Blocked image request:',request.url());
        }
        else{
            request.continue();
            console.log('Allowed request:',request.url());
        }
    }
)
    await page.goto(url,{waitUntil:'networkidle2'});
    await page.screenshot({path:'intercepted.png'});
    await browser.close();

}; 
interceptRequests('https://en.wikipedia.org/wiki/Cat');