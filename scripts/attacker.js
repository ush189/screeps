module.exports = function(creep) {
    if (Game.flags.FlagAttack && Game.flags.FlagAttack.pos.roomName != creep.room.name) {
        creep.moveTo(Game.flags.FlagAttack);
    } else {
        var targetCreeps = creep.room.find(FIND_HOSTILE_CREEPS);
        var targetStructures = creep.room.find(FIND_HOSTILE_STRUCTURES);

        if (targetCreeps.length) {
            if (creep.attack(targetCreeps[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetCreeps[0]);
            }
        } else if (targetStructures.length) {
            if (creep.attack(targetStructures[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetStructures[0]);
            }
        } else {
            creep.moveTo(Game.flags.FlagAttack);
        }
    }
};