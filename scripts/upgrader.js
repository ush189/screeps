module.exports = function(creep) {
    if (creep.room.controller) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_ENOUGH_ENERGY) {
            if (Game.spawns.Home.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.Home);
            }
        }
    }
};