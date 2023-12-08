'use strict';

/*
    · Este código, genera mazmorras aleatorias de salas cuadradas de entre 1 y 4 puertas.
    · El nivel máximo de generación indica el máximo que pueden avanzar estas salas en cualquier dirección (no el mínimo).
    · El mapa se inicializa con tamaño (depth x depth) + 1 (Profundidad 1 = mapa de 3x3)
    · La sala inicial empieza en el centro del mapa (depth, depth) y su numero de puertas es aleatorio (Puede forzarse un tipo de inicial a mano).
    · El resto del mapa se inicializa a 0.
    · La estructura de la sala consta de un array de 4 celdas, los índices representan Norte-Sur-Este-Oeste respectivamente y
      el valor 'false' (no hay puerta) o 'true' (puerta).
    · El algoritmo muestra el mapa con las salas con un string codificado con forma XXXX que representa las salas en sus posiciones (NSEW)
      ejemplo: NW -> 2 puertas, una en el Norte (N) y otra en el oeste (W)
    · La generación de salas está hecha de forma recursiva, generandose aleatoriamente salas en profundidad, pero manteniendo la coherencia de puertas
      aquellas que son generadas posteriormente junto a algunas de las previamente generadas.
*/


function generateDungeon(depth = 1) {
    var dungeon = generateEmptyDungeon(depth * 2 + 1);
    var initialRoomDoors = randomRoomDoors();
    forceAtLeastOneDoor(initialRoomDoors);
    var initialRoom = { x: depth, y: depth, doors: initialRoomDoors };
    dungeon[depth][depth] = initialRoom;

    generateRoomsInDepth(dungeon, depth, initialRoom);

    return dungeon;
}

function generateEmptyDungeon(mapLenght){
    var dungeonMap = [];
    for (let i = 0; i < mapLenght; i++){
        dungeonMap[i] = [];
        for (let j = 0; j < mapLenght; j++) {
            dungeonMap[i][j] = null;
        }
    }
    return dungeonMap;
}

function randomRoomDoors() {
    var roomDoors = [randomBoolean(), randomBoolean(), randomBoolean(), randomBoolean()];
    return roomDoors;
}

function randomBoolean() {
    return Math.random() >= 0.5;
}

function random0to3() {
    // return Math.floor(Math.random() * (max - min + 1) + min);
    return Math.floor(Math.random() * 4)
}

function forceAtLeastOneDoor(roomDoors) {
    const hasAnyDoors = roomDoors.some(door => door === true);
    if (!hasAnyDoors) {
        let randomIndex = random0to3();
        roomDoors[randomIndex] = true;
    }
}

function generateRoomsInDepth(dungeon, depth, room) {
    let hasNorthDoor = room.doors[0];
    let hasSouthDoor = room.doors[1];
    let hasEastDoor = room.doors[2];
    let hasWestDoor = room.doors[3];
    
    if (depth > 1) {
        if (hasNorthDoor && !dungeon[room.x][room.y - 1]) {
            const newRoomN = generateConstraintRandomRoom(dungeon, room.x, room.y - 1);
            dungeon[room.x][room.y - 1] = newRoomN;
            generateRoomsInDepth(dungeon, depth - 1, newRoomN)
        }

        if (hasSouthDoor && !dungeon[room.x][room.y + 1]) {
            const newRoomS = generateConstraintRandomRoom(dungeon, room.x, room.y + 1);
            dungeon[room.x][room.y + 1] = newRoomS;
            generateRoomsInDepth(dungeon, depth - 1, newRoomS)
        }

        if (hasEastDoor && !dungeon[room.x + 1][room.y]) {
            const newRoomE = generateConstraintRandomRoom(dungeon, room.x + 1, room.y);
            dungeon[room.x + 1][room.y] = newRoomE;
            generateRoomsInDepth(dungeon, depth - 1, newRoomE)
        }

        if (hasWestDoor && !dungeon[room.x - 1][room.y]) {
            const newRoomW = generateConstraintRandomRoom(dungeon, room.x - 1, room.y);
            dungeon[room.x - 1][room.y] = newRoomW
            generateRoomsInDepth(dungeon, depth - 1, newRoomW)
        }

    } else if (depth == 1){
        if (hasNorthDoor && !dungeon[room.x][room.y - 1]) {
            const newRoomN = generateRoomAsClosedAsPossible(dungeon, room.x, room.y - 1);
            dungeon[room.x][room.y - 1] = newRoomN;
        }

        if (hasSouthDoor && !dungeon[room.x][room.y + 1]) {
            const newRoomS = generateRoomAsClosedAsPossible(dungeon, room.x, room.y + 1);
            dungeon[room.x][room.y + 1] = newRoomS;
        }

        if (hasEastDoor && !dungeon[room.x + 1][room.y]) {
            const newRoomE = generateRoomAsClosedAsPossible(dungeon, room.x + 1, room.y);
            dungeon[room.x + 1][room.y] = newRoomE;
        }

        if (hasWestDoor && !dungeon[room.x - 1][room.y]) {
            const newRoomW = generateRoomAsClosedAsPossible(dungeon, room.x - 1, room.y);
            dungeon[room.x - 1][room.y] = newRoomW
        }
    }
}

function generateRoomAsClosedAsPossible(dungeon, xPos, yPos) {
    var roomDoors = [false, false, false, false];

    // Checks its northern neighbor
    if ((!yPos == 0)) {
        let northRoomToCheckDoor = dungeon[xPos][yPos - 1];
        if(northRoomToCheckDoor) { // Not null
            roomDoors[0] = northRoomToCheckDoor.doors[1];
        }
    }

    // Checks its southern neighbor
    if(!(yPos == dungeon.length - 1)) {
        let southRoomToCheckDoor = dungeon[xPos][yPos + 1];
        if (southRoomToCheckDoor) {
            roomDoors[1] = southRoomToCheckDoor.doors[0];
        }
    }

    // Checks its eastern neighbor
    if(!(xPos == dungeon.length - 1)) {
        let eastRoomToCheckDoor = dungeon[xPos + 1][yPos];
        if (eastRoomToCheckDoor) {
            roomDoors[2] = eastRoomToCheckDoor.doors[3];
        }
    }

    // Checks its western neighbor
    if(!(xPos == 0)) {
        let westRoomToCheckDoor = dungeon[xPos - 1][yPos];
        if (westRoomToCheckDoor) {
            roomDoors[3] = westRoomToCheckDoor.doors[2];
        }
    }

    var newRoom = {x: xPos, y: yPos, doors: roomDoors};
    return newRoom;
}

function generateConstraintRandomRoom(dungeon, xPos, yPos) {
    var roomDoors = randomRoomDoors();

    // Ahora relleno con coherencia las discordancias
    let northRoomToCheckDoor = dungeon[xPos][yPos - 1];
    let southRoomToCheckDoor = dungeon[xPos][yPos + 1];
    let eastRoomToCheckDoor = dungeon[xPos + 1][yPos];
    let westRoomToCheckDoor = dungeon[xPos - 1][yPos];

    if(northRoomToCheckDoor) { // Not null
        roomDoors[0] = northRoomToCheckDoor.doors[1];
    }

    if (southRoomToCheckDoor) {
        roomDoors[1] = southRoomToCheckDoor.doors[0];
    }

    if (eastRoomToCheckDoor) {
        roomDoors[2] = eastRoomToCheckDoor.doors[3];
    }

    if (westRoomToCheckDoor) {
        roomDoors[3] = westRoomToCheckDoor.doors[2];
    }

    var newRoom = {x: xPos, y: yPos, doors: roomDoors};
    return newRoom;
}

function roomDecode(room) {
    if(room) {
        const [dNorth, dSouth, dEast, dWest] = room.doors;
        var msg = "";    
        if(dNorth) msg += "N";
        if(dSouth) msg += "S";
        if(dEast) msg += "E";
        if(dWest) msg += "W";
        return msg
    } else {
        return "-"
    }
}

function showMap(dungeon) {
    var map = [];
    for(let i = 0; i < dungeon.length; i++){
        map[i] = [];
        for(let j = 0; j < dungeon.length; j++){
            map[i][j] = roomDecode(dungeon[j][i]); // Ajuste para mostrar bien
        }
    }
    console.table(map);
}


//const LEVEL_OF_GENERATION = 3;
//var mapa = generateDungeon(LEVEL_OF_GENERATION);
//showMap(mapa);
