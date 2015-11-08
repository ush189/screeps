module.exports = function (creep) {
    if (creep.carry.energy < creep.carryCapacity) {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[1]);
        }
    } else {
        var extension = _.filter(creep.room.find(FIND_MY_STRUCTURES), function(myStructure) {
            return myStructure.structureType === STRUCTURE_EXTENSION && myStructure.energy < myStructure.energyCapacity;
        }).pop();

        if (extension) {
            if (creep.transferEnergy(extension) == ERR_NOT_IN_RANGE) {
                creep.moveTo(extension);
            }
        } else if (Game.spawns.Home.energy < Game.spawns.Home.energyCapacity) {
            if (creep.transferEnergy(Game.spawns.Home) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.Home);
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