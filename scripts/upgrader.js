module.exports = function(creep) {
    var spawn = creep.room.find(FIND_MY_SPAWNS)[0];

    if (creep.room.controller) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_ENOUGH_ENERGY) {
            if (spawn.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }
        }
    }
};