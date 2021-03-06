module.exports = function (creep, storage) {
    var spawn = creep.room.find(FIND_MY_SPAWNS)[0];
    var source = _.sortBy(spawn.room.find(FIND_SOURCES), function(source) {
        return spawn.pos.getRangeTo(source.pos);
    }).pop();

    if (storage && storage.store.energy > 0 && source.energy == 0 && (creep.carry.energy < 50 || creep.pos.isNearTo(storage) && creep.carry.energy < creep.carryCapacity)) {
        if (storage.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storage);
        }
    } else if (creep.carry.energy < 50 || creep.pos.isNearTo(source) && creep.carry.energy < creep.carryCapacity) {
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    } else {
        var emptyExtensions = _.filter(creep.room.find(FIND_MY_STRUCTURES), function(myStructure) {
            return myStructure.structureType === STRUCTURE_EXTENSION && myStructure.energy < myStructure.energyCapacity;
        });

        var link = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_LINK }
        });

        if (emptyExtensions.length) {
            var nearestEmptyExtension = _.sortBy(emptyExtensions, function(extension) {
                return creep.pos.getRangeTo(extension.pos);
            }).shift();

            if (creep.transferEnergy(nearestEmptyExtension) == ERR_NOT_IN_RANGE) {
                creep.moveTo(nearestEmptyExtension);
            }
        } else if (link && link.energy < link.energyCapacity) {
            if (creep.transferEnergy(link) == ERR_NOT_IN_RANGE) {
                creep.moveTo(link);
            }
        } else if (storage) {
            if (creep.transferEnergy(storage) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
        }
    }
};