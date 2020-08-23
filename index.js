const puppeteer = require('puppeteer');
const fs = require('fs');
 
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://instagram.com/rocketseat_oficial');

  const imgList = await page.evaluate(() => {
      // execute a function in the browser

      // get the first images of the site
        const nodeList = document.querySelectorAll('article img')
      // turn NodeList in a array
        const imgArray = [...nodeList]
      // transform the elements HTML in JS objects
        const imgList = imgArray.map( ({src}) => ({
          src
        }))
      // returs this object
        return imgList
    })

  // write this data to a local archive (json)
  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
    if(err) throw new Error('something went wrong')

    console.log('well done')
  })

  await browser.close();
})();