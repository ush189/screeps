module.exports = function (creep) {
    var spawn = creep.room.find(FIND_MY_SPAWNS)[0];
    var source = _.sortBy(spawn.room.find(FIND_SOURCES), function(source) {
        return spawn.pos.getRangeTo(source.pos);
    }).pop();

    if (creep.carry.energy < 50 || creep.pos.isNearTo(source) && creep.carry.energy < creep.carryCapacity) {
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    } else {
        var extensions = _.filter(creep.room.find(FIND_MY_STRUCTURES), function(myStructure) {
            return myStructure.structureType === STRUCTURE_EXTENSION && myStructure.energy < myStructure.energyCapacity;
        });


        if (extensions.length) {
            var nearestExtension = _.sortBy(extensions, function(extension) {
                return creep.pos.getRangeTo(extension.pos);
            }).shift();

            if (creep.transferEnergy(nearestExtension) == ERR_NOT_IN_RANGE) {
                creep.moveTo(nearestExtension);
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