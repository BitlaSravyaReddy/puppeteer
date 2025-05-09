const puppeteer=require('puppeteer');

(async()=>{
    const browser=await puppeteer.launch({headless:false});
    const page=await browser.newPage();
    await Promise.all([
        page.coverage.startJSCoverage(),
        page.coverage.startCSSCoverage()
    ]);

    await page.goto('https://www.wikipedia.org/');
    const [jsCoverage, cssCoverage]=await Promise.all([
        page.coverage.stopJSCoverage(),
        page.coverage.stopCSSCoverage()
    ]);
    let totalBytes=0;
    let usedBytes=0;

    for(const entry of jsCoverage){
        totalBytes+=entry.text.length;
        for(const range of entry.ranges){
            usedBytes+=range.end-range.start+1;
        }   
        
    }
    console.log(`Total JS bytes: ${totalBytes}`);
    console.log(`Used JS bytes: ${usedBytes}`);

    let CSStotalBytes=0;
    let CSSusedBytes=0;

    for(const entry of cssCoverage){
        CSStotalBytes+=entry.text.length;
        for(const range of entry.ranges){
            CSSusedBytes+=range.end-range.start+1;
        }   
        
    }
    console.log(`Total CSS bytes: ${CSStotalBytes}`);
    console.log(`Used CSS bytes: ${CSSusedBytes}`);
    await browser.close();

})();