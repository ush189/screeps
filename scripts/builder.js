module.exports = function(creep) {
    var spawn = creep.room.find(FIND_MY_SPAWNS)[0];

    if (creep.carry.energy == 0) {
        if (spawn.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn);
        }
        delete creep.memory.targetId;
    } else {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        } else {
            var target;
            if (creep.memory.targetId) {
                target = Game.getObjectById(creep.memory.targetId);
                if (target.hits == target.hitsMax) {
                    target = null;
                }
            }

            if (!target) {
                var repairableStructures = _.filter(creep.room.find(FIND_STRUCTURES), function(structure) {
                    return (structure.structureType === STRUCTURE_RAMPART || structure.structureType === STRUCTURE_WALL) && structure.hits < structure.hitsMax;
                });

                if (repairableStructures.length) {
                    target = _.sortBy(repairableStructures, 'hits')[0];
                    creep.memory.targetId = target.id;
                }
            }

            if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};