/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
module.exports = function (creep) {
    if (creep.carry.energy < creep.carryCapacity) {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[1]);
        }
    } else {
        targets = creep.room.find(FIND_MY_STRUCTURES);
        if (targets.length) {
            for (var i in targets) {
                if (targets[i].structureType === STRUCTURE_EXTENSION/* || targets[i].structureType === STRUCTURE_STORAGE)*/) {
                    if (creep.transferEnergy(targets[i]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[i]);
                    }
                }
            }
        } else {
            if (creep.transferEnergy(Game.spawns.Home) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.Home);
            }
        }
    }
}