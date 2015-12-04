module.exports = function(creep) {
    var spawn = creep.room.find(FIND_MY_SPAWNS)[0];

    if (creep.room.controller) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_ENOUGH_ENERGY) {
            var link = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_LINK }
            });

            if (link && link.transferEnergy(creep) == OK) {
                // nothing more to do
            } else if (spawn.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }
        }
    }
};