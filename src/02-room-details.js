/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

/**
 * getRoomByDinosaurName()
 * ---------------------
 * Return the name of the room where the given dinosaur can be found. If the dinosaur does not exist in the `dinosaurs` list or cannot be found in any room, return an error message that says so.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The name of the room where the dinosaur can be found. Alternatively, an error message.
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Tyrannosaurus");
 *  //> "Roberts Room"
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Pterodactyl");
 *  //> "Dinosaur with name 'Pterodactyl' cannot be found."
 */
function getDinoId(dinosaurs, name) {
  for (let i = 0; i < dinosaurs.length; i++) {
    const dinosaur = dinosaurs[i];
    if (dinosaur.name === name) {
      return dinosaur.dinosaurId;
    }
  }

  return null;
}

function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  const id = getDinoId(dinosaurs, dinosaurName);
  if (id === null) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }

  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    if (room.dinosaurs.includes(id)) {
      return room.name;
    }
  }

  // Made it through the loop above without finding and returning a room name.
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
}

/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room. If a room ID cannot be found, an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} id - A unique room identifier.
 * @returns {string|string[]} An array of room names, or an error message.
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "aIA6tevTne");
 *  //> ["Ticket Center"]
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "A6QaYdyKra");
 *  //> [
      "Entrance Room",
      "Coat Check Room",
      "Ellis Family Hall",
      "Kit Hopkins Education Wing"
    ]
 */

function getRoomById(rooms, id) {
  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    if (room.roomId === id) {
      return room;
    }
  }

  return null;
}

function getConnectedRoomNamesById(rooms, id) {
  const result = [];
  const room = getRoomById(rooms, id);
  if (room === null) {
    return `Room with ID of '${id}' could not be found.`;
  }

  const connectedIds = room.connectsTo;
  for (let i = 0; i < connectedIds.length; i++) {
    const connectedRoomId = connectedIds[i];
    const connectedRoom = getRoomById(rooms, connectedRoomId);
    if (connectedRoom === null) {
      return `Room with ID of '${connectedRoomId}' could not be found.`;
    }

    result.push(connectedRoom.name);
  }

  return result;
}

// Uses the built-in array method `.find` to replicate what our helper function does.
// So no need for a helper function!
function getConnectedRoomNamesByIdAlt(rooms, id) {
  const result = [];
  const room = rooms.find((room) => room.roomId === id);
  if (room === undefined) {
    return `Room with ID of '${id}' could not be found.`;
  }

  const connectedIds = room.connectsTo;
  for (let i = 0; i < connectedIds.length; i++) {
    const connectedRoomId = connectedIds[i];
    const connectedRoom = rooms.find((room) => room.roomId === connectedRoomId);
    if (connectedRoom === undefined) {
      return `Room with ID of '${connectedRoomId}' could not be found.`;
    }

    result.push(connectedRoom.name);
  }

  return result;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
