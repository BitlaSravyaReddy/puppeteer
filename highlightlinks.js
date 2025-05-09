const puppeteer=require('puppeteer');

async function highlightLinks(url){
    const browser=await puppeteer.launch({headless:false});
    const page=await browser.newPage();
    await page.goto(url);
    await page.screenshot({path: 'before.png'});

    await page.evaluate(() => {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            link.style.backgroundColor = 'yellow';
            link.style.color = 'red';
            link.style.fontWeight = 'bold';
        });
    });
await page.screenshot({path: 'after.png'});
await browser.close();
}

highlightLinks('https://en.wikipedia.org/wiki/Cat');
