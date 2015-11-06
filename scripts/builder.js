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
            var repairableStructures = _.filter(creep.room.find(FIND_STRUCTURES), function(structure) {
                return (structure.structureType === STRUCTURE_RAMPART || structure.structureType === STRUCTURE_WALL) && structure.hits < structure.hitsMax;
            });

            var repairableStructuresInRange = creep.pos.findInRange(repairableStructures, 1);
            if (repairableStructuresInRange.length) {
                creep.repair(_.sortBy(repairableStructuresInRange, 'hits')[0]);
            } else {
                var repairableStructureWithLowestHits = _.sortBy(repairableStructures, 'hits')[0];

                if (creep.repair(repairableStructureWithLowestHits) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairableStructureWithLowestHits);
                }
            }
        }
    }
}