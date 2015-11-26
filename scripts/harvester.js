module.exports = function (creep) {
    var spawn = creep.room.find(FIND_MY_SPAWNS)[0];

    if (creep.carry.energy < creep.carryCapacity) {
        var source = spawn.pos.findClosestByRange(FIND_SOURCES);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    } else {
        if (creep.transferEnergy(spawn) == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn);
        }
    }
};