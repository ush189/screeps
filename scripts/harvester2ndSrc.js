module.exports = function (creep) {
    var spawn = creep.room.find(FIND_MY_SPAWNS)[0];

    if (creep.carry.energy < creep.carryCapacity) {
        var source = _.sortBy(spawn.room.find(FIND_SOURCES), function(source) {
            return spawn.pos.getRangeTo(source.pos);
        }).pop();
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    } else {
        var extension = _.filter(creep.room.find(FIND_MY_STRUCTURES), function(myStructure) {
            return myStructure.structureType === STRUCTURE_EXTENSION && myStructure.energy < myStructure.energyCapacity;
        }).pop();

        if (extension) {
            if (creep.transferEnergy(extension) == ERR_NOT_IN_RANGE) {
                creep.moveTo(extension);
            }
        } else if (spawn.energy < spawn.energyCapacity) {
            if (creep.transferEnergy(spawn) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }
        } else {
            var storage = _.filter(creep.room.find(FIND_MY_STRUCTURES), function(myStructure) {
                return myStructure.structureType === STRUCTURE_STORAGE;
            }).pop();

            if (storage) {
                if (creep.transferEnergy(storage) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }
        }
    }
};