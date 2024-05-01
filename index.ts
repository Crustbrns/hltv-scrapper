import { drawMaps, saveMapResult, style, workbook, worksheet } from "./excel";
import { drawGames } from "./maps";

const playwright = require('playwright');
const cheerio = require('cheerio')

let text = Array<any>();

// const fs = require('node:fs');
// fs.readFile('hltv.txt', 'utf8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   text = JSON.parse(data);
//   console.log(text.length);
// });

// async function test(){
//  const browser = await playwright.chromium.launch({headless: false});

//  const page = await browser.newPage();

//  for(let i = 520; i < 600; i++) {
//     await page.goto(`https://egamersworld.com/counterstrike/matches/history/page/${i}`);
//     let html = await page.content();

//     let index = 0;
//     //  do {
//         const searchStr = 'tournament_id';
//         let indexes = [...html.matchAll(new RegExp(searchStr, 'gi'))].map(a => a.index);
//         indexes = indexes.filter(x=>x !== indexes[indexes.length-1]);
//         for (const index of indexes) {
//             let newindex = html.indexOf(`"tournament_id\\":\\`, index);
//             let tournament_id = html.slice(newindex + 19, newindex + 35);
//             let slug_index = html.indexOf('"slug\\":\\"', index);
//             let slug_id = html.slice(slug_index + 10, slug_index + 100);

//             let url = 'https://egamersworld.com/counterstrike/match/' + tournament_id.slice(0, tournament_id.indexOf('\\')) + '/' + slug_id.slice(0, slug_id.indexOf(`\\"`));
//             if(!text.includes(url)) {
//                 text.push(url); 
//             }
//         }
//         //  let tournament_id = html.slice(newindex).slice(html.indexOf(`"tournament_id\\":\\`) + 19, html.indexOf(`"tournament_id\\":\\`) + 35);
//         //  console.log(indexes);
//         //  index = newindex;
//     //  } while(index < html.length);

//     //  let tournament_id = html.slice(html.indexOf(`"tournament_id\\":\\`) + 19, html.indexOf(`"tournament_id\\":\\`) + 35)

//     }

//     await browser.close();

//     const fs = require("node:fs");
//         fs.writeFile("test.txt", JSON.stringify(text), (err) => {
//         if (err) {
//             console.error(err);
//         } else {
//         }
//         });
// }
drawMaps();

async function hltv() {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    //  for(let i = 0; i < 600; i++) {
    await page.goto(`https://www.hltv.org/results?offset=0`);
    let html = await page.content();
    await page.getByText('Allow all cookies').click()
        .then(async () => {
            const pagePromise = context.waitForEvent('page');
            page.locator('.a-reset').first().click({ button: "middle" });
            const newPage = await pagePromise;
            await newPage.waitForLoadState();
            await saveMapResult(newPage);
        })
        .then(async ()=>{ 
            await drawGames();
        })

    // let index = 0;
    // //  do {
    //     const searchStr = 'tournament_id';
    //     let indexes = [...html.matchAll(new RegExp(searchStr, 'gi'))].map(a => a.index);
    //     indexes = indexes.filter(x=>x !== indexes[indexes.length-1]);
    //     for (const index of indexes) {
    //         let newindex = html.indexOf(`"tournament_id\\":\\`, index);
    //         let tournament_id = html.slice(newindex + 19, newindex + 35);
    //         let slug_index = html.indexOf('"slug\\":\\"', index);
    //         let slug_id = html.slice(slug_index + 10, slug_index + 100);

    //         let url = 'https://egamersworld.com/counterstrike/match/' + tournament_id.slice(0, tournament_id.indexOf('\\')) + '/' + slug_id.slice(0, slug_id.indexOf(`\\"`));
    //         if(!text.includes(url)) {
    //             text.push(url); 
    //         }
    //     }

    // await browser.close();
    // }


    // const fs = require("node:fs");
    //     fs.writeFile("test.txt", JSON.stringify(text), (err) => {
    //     if (err) {
    //         console.error(err);
    //     } else {
    //     }
    //     });
}

hltv()
.then(()=>{
    workbook.write('Excel.xlsx');
})