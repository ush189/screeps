module.exports = function(creep, storage) {
    if (storage) {
        if (storage.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storage);
        } else {
            var link = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_LINK }
            });

            if (creep.transferEnergy(link) == ERR_NOT_IN_RANGE) {
                creep.moveTo(link);
            }
        }
    }
};