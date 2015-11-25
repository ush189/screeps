var harvester = require('harvester');
var harvester2ndSrc = require('harvester2ndSrc');
var builder = require('builder');
var guard = require('guard');
var upgrader = require('upgrader');
var claimer = require('claimer');

module.exports.loop = function () {
    for (var code in Game.rooms) {
        var countHarvester = 0;
        var countHarvester2ndSrc = 0;
        var countBuilder = 0;
        var countGuard = 0;
        var countUpgrader = 0;
        var countClaimer = 0;

        var room = Game.rooms[code];
        var creeps = room.find(FIND_MY_CREEPS);

        for (var name in creeps) {
            var creep = creeps[name];
            switch (creep.memory.role) {
                case 'harvester': harvester(creep); countHarvester++; break;
                case 'harvester2ndSrc': harvester2ndSrc(creep); countHarvester2ndSrc++; break;
                case 'builder': builder(creep); countBuilder++; break;
                case 'guard': guard(creep); countGuard++; break;
                case 'upgrader': upgrader(creep); countUpgrader++; break;
                case 'claimer': claimer(creep); countClaimer++; break;
            }
        }

        var spawn = room.find(FIND_MY_SPAWNS)[0];
        if (spawn) {
            if (countHarvester < 4) {
                if (spawn.canCreateCreep([WORK, CARRY, MOVE]) === OK) {
                    console.log(room + ' build harvester: ', spawn.createCreep([WORK, CARRY, MOVE], 'harvester' + Math.floor((Math.random() * 10) + 1), {role: 'harvester'}));
                } else {
                    var creepsToBrainwash = _.filter(creeps, function(creep) {
                        return creep.memory.role !== 'harvester';
                    });
                    if (creepsToBrainwash.length) {
                        creepsToBrainwash[0].memory.role = 'harvester';
                    }
                }
            } else if (room.find(FIND_SOURCES).length > 1 && countHarvester2ndSrc < 4) {
                console.log(room + ' build harvester2ndSrc: ', spawn.createCreep([WORK, CARRY, MOVE], 'harvester2ndSrc' + Math.floor((Math.random() * 10) + 1), {role: 'harvester2ndSrc'}));
            } else if (countBuilder < 2) {
                console.log(room + ' build builder: ', spawn.createCreep([CARRY, MOVE, WORK, CARRY, MOVE], 'builder' + Math.floor((Math.random() * 10) + 1), {role: 'builder'}));
            } else if (countUpgrader < 2) {
                console.log(room + ' build upgrader: ', spawn.createCreep([WORK, WORK, CARRY, MOVE], 'upgrader' + Math.floor((Math.random() * 10) + 1), {role: 'upgrader'}));
            } else if (countClaimer < 1) {
                console.log(room + ' build claimer: ', spawn.createCreep([WORK, MOVE, CARRY, MOVE, WORK, MOVE, CARRY, MOVE], 'claimer' + Math.floor((Math.random() * 10) + 1), {role: 'claimer'}));
            }
        }
    }
};