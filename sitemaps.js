const puppeteer=require('puppeteer');
const axios=require('axios');
const {parseStringPromise}=require('xml2js');
const fs=require('fs');

async function fetchSitemap(url) {
    try{
        const response=await axios.get(url);
        const data=response.data;
        const parsedData=await parseStringPromise(data);
        const urls=parsedData.urlset.url.map(item=>item.loc[0]);
        
        const browser=await puppeteer.launch();
        const sitemapsPages=urls.map(async(url)=>{
            const page= await browser.newPage();
            await page.goto(url);
            const data=await page.evaluate(()=>{
                const title=document.title;
               
                return {title};
            });
    
            await page.close();
                        
            return data;


        
        });
        const output='sitemapData.json';
        const results=await Promise.all(sitemapsPages);
        fs.writeFileSync(output, JSON.stringify(results));
        console.log('Sitemap data saved to', output);
        await browser.close();

    }catch(error){
        console.error('Error fetching sitemap:', error);
        
    }
}
const url="https://www.wpbeginner.com/page-sitemap.xml";
fetchSitemap(url)