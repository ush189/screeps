module.exports = function(creep) {
    var source = creep.pos.findClosestByRange(FIND_SOURCES);

    if (creep.room.controller && !creep.room.controller.my) {
        if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    } else if (creep.room.controller && creep.room.controller.my && creep.room.controller.ticksToDowngrade < 2500) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_ENOUGH_ENERGY) {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    } else if (Game.flags.FlagClaim) {
        if (!_.isEqual(creep.pos, Game.flags.FlagClaim.pos)) {
            creep.moveTo(Game.flags.FlagClaim)
        } else {
            Game.flags.FlagClaim.remove();
        }
    } else {
        if (!creep.room.find('FIND_MY_STRUCTURES').length && creep.ticksToLive < 10) {
            creep.room.createFlag(creep.pos, 'FlagClaim');
        }

        if (creep.carry.energy == 0 || creep.carry.energy < creep.carryCapacity && creep.pos.inRangeTo(source, 1)) {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            var targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_ENOUGH_ENERGY) {
                    if (spawn.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(spawn);
                    }
                }
            }
        }
    }
};