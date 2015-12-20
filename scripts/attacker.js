module.exports = function(creep) {
    if (Game.flags.FlagAttack && Game.flags.FlagAttack.pos.roomName != creep.room.name) {
        creep.moveTo(Game.flags.FlagAttack);
    } else {
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: function(creep) {
                return creep.getActiveBodyparts(ATTACK) >= 1 || creep.getActiveBodyparts(RANGED_ATTACK) >= 1;
            }
        });

        if (!target) {
            target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        }

        if (!target) {
            target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                    filter: function(structure) {
                        return structure.structureType != STRUCTURE_CONTROLLER;
                    }
                }
            )
        }

        if (target) {
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                if (creep.moveTo(target) == ERR_NO_BODYPART) {
                    creep.suicide();
                }
            }
        } else {
            creep.moveTo(Game.flags.FlagAttack);
        }
    }
};