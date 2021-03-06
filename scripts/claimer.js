module.exports = function(creep) {
    var source = creep.pos.findClosestByRange(FIND_SOURCES);

    if (Game.flags.FlagClaim && Game.flags.FlagClaim.pos.roomName != creep.room.name) {
        creep.moveTo(Game.flags.FlagClaim);
    } else if (Game.flags.FlagClaim && creep.room.controller && !creep.room.controller.my) {
        if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    } else if (Game.flags.FlagClaim && creep.room.controller && creep.room.controller.my && creep.room.controller.ticksToDowngrade < 2500) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_ENOUGH_ENERGY) {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    } else {
        if (creep.carry.energy == 0 || creep.carry.energy < creep.carryCapacity && creep.pos.isNearTo(source)) {
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