'use strict';

var generation_button = document.getElementById('btn-generate');
generation_button.addEventListener('click', btnGenMap)

function printTile (roomSTR) {
    var uri = ""
    const tileClass = roomSTR == '-' ? 'empty' : roomSTR;

    switch (roomSTR) {
        case '-':
            uri = './img/empty.gif';
            break;

        case 'N':
        case 'S':
        case 'E':
        case 'W':
            uri = './img/1door.gif';
            break;
        
        case 'NS':
        case 'EW':
            uri = './img/2doorsvs.gif';
            break;

        case 'NE':
        case 'NW':
        case 'SE':
        case 'SW':
            uri = './img/2doorscont.gif';
            break;
        
        case 'NSE':
        case 'NSW':
        case 'NEW':
        case 'SEW':
            uri = './img/3doors.gif';
            break;

        case 'NSEW':
            uri = './img/4doors.gif';
            break;

        default:
            break;
    }
    
    var tileHTML = `<td><img class="${tileClass}" src="${uri}" alt="${tileClass}"></td>`;
    return tileHTML;
}

function btnGenMap(e) {
    e.preventDefault();
    const MAP_DEPTH = Number(document.getElementById('gen_levels').value);
    var mapa = generateDungeon(MAP_DEPTH);
    // showMap(mapa); // Console

    var generatedHTML = "";
    for(let i = 0; i < mapa.length; i++){
        generatedHTML += "<tr>";
        for(let j = 0; j < mapa.length; j++){
            const code = roomDecode(mapa[j][i]);
            generatedHTML +=  printTile(code);
        }
        generatedHTML += "</tr>";
    }
    document.getElementById('dungeon-map').innerHTML = generatedHTML;
}
