/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('upgrader'); // -> 'a thing'
 */
module.exports = function(creep) {
    if (creep.room.controller) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_ENOUGH_ENERGY) {
            if (Game.spawns.Home.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.Home);
            }
        }
    }
}