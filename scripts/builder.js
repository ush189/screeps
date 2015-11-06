/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder'); // -> 'a thing'
 */
module.exports = function(creep) {
    if (creep.carry.energy == 0) {
        if (Game.spawns.Home.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns.Home);
        }
    } else {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        } else {
            targets = creep.room.find(FIND_STRUCTURES);
            var lowestHits = null;
            for (var i in targets) {
                if ((targets[i].structureType === STRUCTURE_RAMPART || targets[i].structureType === STRUCTURE_WALL) && (lowestHits === null || targets[i].hits < lowestHits.hits)) {
                    lowestHits = targets[i];
                }
            }
            if (creep.repair(lowestHits) == ERR_NOT_IN_RANGE) {
                creep.moveTo(lowestHits);
            }
        }
    }
}