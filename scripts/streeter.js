module.exports = function(creep) {
    var spawn = creep.room.find(FIND_MY_SPAWNS)[0];

    if (creep.carry.energy == 0) {
        if (spawn.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn);
        }
    } else {
        var repairableStructures = _.filter(creep.room.find(FIND_STRUCTURES), function(structure) {
            return structure.structureType === STRUCTURE_ROAD && structure.hits < structure.hitsMax;
        });

        var repairableStructureWithLowestHits = _.sortBy(repairableStructures, 'hits')[0];
        if (creep.repair(repairableStructureWithLowestHits) == ERR_NOT_IN_RANGE) {
            creep.moveTo(repairableStructureWithLowestHits);
        }
    }
};