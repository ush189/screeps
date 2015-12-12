var externRoomPerSpawn = {
    Home: 'E12N14',
    Outpost1: 'E11N12',
    Outpost2: 'E11N13'
};

var moveOptions = {
    reusePath: 10
}

module.exports = function(creep, homeSpawn) {
    if (!creep.memory.homeSpawnId) {
        creep.memory.homeSpawnId = homeSpawn.id;
        creep.memory.targetRoomName = externRoomPerSpawn[homeSpawn.name];
    }

    if (creep.room.name != creep.memory.targetRoomName) {
        var targetRoomPos = new RoomPosition(10,10, creep.memory.targetRoomName);
        creep.moveTo(targetRoomPos, moveOptions);
    } else {
        var source = creep.pos.findClosestByRange(FIND_SOURCES);
        if (creep.carry.energy == 0 || creep.carry.energy < creep.carryCapacity && creep.pos.isNearTo(source)) {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, moveOptions);
            }
        } else {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], moveOptions);
                }
            } else {
                var repairableStructures = _.filter(creep.room.find(FIND_STRUCTURES), function(structure) {
                    return structure.structureType === STRUCTURE_ROAD && structure.hits < structure.hitsMax;
                });

                var repairableStructuresInRange = creep.pos.findInRange(repairableStructures, 3);
                if (repairableStructuresInRange.length) {
                    creep.repair(repairableStructuresInRange[0]);
                } else {
                    var repairableStructureWithLowestHits = _.sortBy(repairableStructures, 'hits')[0];
                    creep.moveTo(repairableStructureWithLowestHits)
                }
            }
        }
    }
};