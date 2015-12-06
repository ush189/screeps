var harvester = require('harvester');
var harvester2ndSrc = require('harvester2ndSrc');
var builder = require('builder');
var guard = require('guard');
var upgrader = require('upgrader');
var claimer = require('claimer');
var streeter = require('streeter');
var harvesterExtern = require('harvesterExtern');
var linker = require('linker');

Spawn.prototype.createCreepDynamic = function(room, body, role, maxFactor) {
    var factor;

    if ((!maxFactor || maxFactor >= 4) && this.canCreateCreep(body.concat(body, body, body)) === OK) {
        body = body.concat(body, body, body);
        factor = 4;
    } else if ((!maxFactor || maxFactor >= 3) && this.canCreateCreep(body.concat(body, body)) === OK) {
        body = body.concat(body, body);
        factor = 3;
    } else if ((!maxFactor || maxFactor >= 2) && this.canCreateCreep(body.concat(body)) === OK) {
        body = body.concat(body);
        factor = 2;
    } else {
        factor = 1;
    }

    var minFactor = this.memory.minFactor || 1;
    if (!maxFactor && factor < minFactor) {
        console.log('minFactor ' + minFactor + ' > factor ' + factor);

        if (room.find(FIND_MY_CREEPS).length == 0) {
            // reset factor
            this.memory.minFactor = 1;
        }

        return null;
    }

    var creepName = role + Math.floor((Math.random() * 10) + (factor - 1) * 10);
    result = this.createCreep(body, creepName, {role: role});
    console.log(room, 'build ' + role + ': ', result);
    return result;
};

module.exports.loop = function () {
    for (var code in Game.rooms) {
        var countHarvester = 0;
        var countHarvester2ndSrc = 0;
        var countBuilder = 0;
        var countGuard = 0;
        var countUpgrader = 0;
        var countStreeter = 0;
        var countLinker = 0;

        var room = Game.rooms[code];
        var creeps = room.find(FIND_MY_CREEPS);
        var spawn = room.find(FIND_MY_SPAWNS)[0];
        var storage = room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_STORAGE }
        }).pop();

        var links = room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_LINK }
        });
        if (links.length >= 2) {
            linksByRangeToController = _.sortBy(links, function(link) {
                return link.pos.getRangeTo(room.controller);
            });
            var targetLink = linksByRangeToController.shift();
            for (var i in linksByRangeToController) {
                linksByRangeToController[i].transferEnergy(targetLink);
            }
        }

        var countHarvesterExtern = _.filter(Game.creeps, function(creep) {
            return creep.memory.role == 'harvesterExtern' && spawn && creep.memory.homeSpawnId == spawn.id;
        }).length;

        var countClaimer = _.filter(Game.creeps, function(creep) {
            return creep.memory.role == 'claimer';
        }).length;

        for (var name in creeps) {
            var creep = creeps[name];
            switch (creep.memory.role) {
                case 'harvester': harvester(creep); countHarvester++; break;
                case 'harvester2ndSrc': harvester2ndSrc(creep, storage); countHarvester2ndSrc++; break;
                case 'builder': builder(creep); countBuilder++; break;
                case 'guard': guard(creep); countGuard++; break;
                case 'upgrader': case 'upgrader+': upgrader(creep); countUpgrader++; break;
                case 'claimer': claimer(creep); break;
                case 'streeter': streeter(creep); countStreeter++; break;
                case 'harvesterExtern': harvesterExtern(creep, spawn); break;
                case 'linker': linker(creep, storage); countLinker++; break;
            }
        }

        if (spawn) {
            if (countHarvester < 4) {
                var result = spawn.createCreepDynamic(room, [WORK, CARRY, MOVE], 'harvester');
                if (result === ERR_NOT_ENOUGH_ENERGY) {
                    var creepsToBrainwash = _.filter(creeps, function(creep) {
                        return creep.memory.role !== 'harvester';
                    });
                    if (creepsToBrainwash.length) {
                        creepsToBrainwash[0].memory.role = 'harvester';
                    }
                }
            } else if (room.find(FIND_SOURCES).length > 1 && countHarvester2ndSrc < 4) {
                spawn.createCreepDynamic(room, [WORK, CARRY, MOVE], 'harvester2ndSrc');
            } else if (countBuilder < 2) {
                spawn.createCreepDynamic(room, [WORK, CARRY, MOVE], 'builder');
            } else if (countUpgrader < 3) {
                if (links.length >= 2) {
                    spawn.createCreepDynamic(room, [WORK, WORK, CARRY, MOVE], 'upgrader+');
                } else {
                    spawn.createCreepDynamic(room, [WORK, CARRY, MOVE], 'upgrader');
                }
            } else if (Game.flags.FlagClaim && countClaimer < 1) {
                spawn.createCreepDynamic(room, [WORK, CARRY, MOVE], 'claimer');
            } else if (countStreeter < 1) {
                spawn.createCreepDynamic(room, [WORK, CARRY, MOVE], 'streeter');
            } else if (countHarvesterExtern < 3) {
                spawn.createCreepDynamic(room, [WORK, CARRY, MOVE], 'harvesterExtern');
            } else if (links.length && storage && countLinker < 1) {
                spawn.createCreepDynamic(room, [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE], 'linker', 1);
            }
        }
    }
};