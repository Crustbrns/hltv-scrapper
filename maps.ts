import { style, worksheet } from "./excel";

export const maps = new Array<TableMap>(
    { map: 'Mirage', column: 3 },
    { map: 'Vertigo', column: 4 },
    { map: 'Nuke', column: 5 },
    { map: 'Ancient', column: 6 },
    { map: 'Anubis', column: 7 },
    { map: 'Inferno', column: 8 },
    { map: 'Dust2', column: 9 },
    { map: 'Overpass', column: 10 }
)

export const config = {
    match: 0
}

export type TableMap = {
    map: string,
    column: number
}

export class Map {
    public mapTitle: string;
    public isNade: boolean;

    constructor(mapTitle: string, isNade: boolean) {
        this.mapTitle = mapTitle;
        this.isNade = isNade;
    }
}

export interface Game {
    matchTitle: string,
    score: string,
    maps: Array<Map>
}

export const Games = Array<Game>();

export async function drawGames() {
    Games.map((item: Game, index: number) => {
        worksheet.cell(4 + index, 1).string(item.matchTitle).style(style);
        worksheet.cell(4 + index, 2).string(item.score).style(style);
        item.maps.map((item: Map) => {
            worksheet.cell(4 + index, maps.find(x => x.map === item.mapTitle)!.column).number(item.isNade ? 1 : 0).style(style);
        })
    })
} 