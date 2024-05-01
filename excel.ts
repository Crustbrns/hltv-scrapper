import { Game, Games, Map, config, maps } from "./maps";

var excel = require('excel4node');
export var workbook = new excel.Workbook();
export var worksheet = workbook.addWorksheet('Sheet 1');

// Create a reusable style
export var style = workbook.createStyle({
    font: {
        color: '#000000',
        size: 12
    }
});

export function drawMaps() {
    let index = 3;

    worksheet.cell(3, 1).string('Match').style(style);
    worksheet.cell(3, 2).string('Score').style(style);

    for (const item of maps) {
        worksheet.cell(3, index++).string(item.map).style(style);
    }
}

export async function saveMapResult(page: any) {
    await page.getByText('Detailed stats').click();
    await page.getByText('Heatmaps').click();

    let title = await page.title();
    let score = await page.locator('.stats-match-map-result-score').first().innerText();

    let maps = Array<Map>();
    const mapsIterators = page.locator('.dynamic-map-name-full');
    let mapsCount = await mapsIterators.count();
    for (let i = 1; i < mapsCount; i++) {
        let isNade = false;
        await mapsIterators.nth(i).click();
        console.log(await page.getByRole('option').locator(':has-text("hegrenade")').count());
        maps.push(new Map(await mapsIterators.nth(i).innerText(), isNade));
    }


    console.log(maps);
    let game: Game = {
        matchTitle: title,
        score: score,
        maps: maps
    }

    Games.push(game);

    // worksheet.cell(4, 1).string(title).style(style);
}
