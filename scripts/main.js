var harvester = require('harvester');
var harvester2ndSrc = require('harvester2ndSrc');
var builder = require('builder');
var guard = require('guard');
var upgrader = require('upgrader');
var claimer = require('claimer');

module.exports.loop = function () {
    var countHarvester = 0;
    var countHarvester2ndSrc = 0;
    var countBuilder = 0;
    var countGuard = 0;
    var countUpgrader = 0;
    var countClaimer = 0;

    var homeRoom = Game.spawns.Home.room;

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        switch (creep.memory.role) {
            case 'harvester': harvester(creep); countHarvester++; break;
            case 'harvester2ndSrc': harvester2ndSrc(creep); countHarvester2ndSrc++; break;
            case 'builder': builder(creep); countBuilder++; break;
            case 'guard': guard(creep); countGuard++; break;
            case 'upgrader': upgrader(creep); countUpgrader++; break;
            case 'claimer': claimer(creep); countClaimer++; break;
        }
    }

    if (countHarvester < 4) {
        if (Game.spawns.Home.canCreateCreep([WORK, CARRY, MOVE]) === OK) {
            Game.spawns.Home.createCreep([WORK, CARRY, MOVE], 'harvester' + Math.floor((Math.random() * 10) + 1), {role: 'harvester'})
        } else {
            var creepsToBrainwash = _.filter(Game.creeps, function(creep) {
                return creep.memory.role !== 'harvester';
            });
            if (creepsToBrainwash.length) {
                creepsToBrainwash[0].memory.role = 'harvester';
            }
        }
    } else if (homeRoom.find(FIND_SOURCES).length > 1 && countHarvester2ndSrc < 4) {
        console.log('build harvester2ndSrc: ', Game.spawns.Home.createCreep([WORK, CARRY, MOVE], 'harvester2ndSrc' + Math.floor((Math.random() * 10) + 1), {role: 'harvester2ndSrc'}));
    } else if (countBuilder < 2) {
        console.log('build builder: ', Game.spawns.Home.createCreep([CARRY, MOVE, WORK, CARRY, MOVE], 'builder' + Math.floor((Math.random() * 10) + 1), {role: 'builder'}));
    } else if (countUpgrader < 2) {
        console.log('build upgrader: ', Game.spawns.Home.createCreep([WORK, WORK, CARRY, MOVE], 'upgrader' + Math.floor((Math.random() * 10) + 1), {role: 'upgrader'}));
    } else if (countClaimer < 1) {
        console.log('build claimer: ', Game.spawns.Home.createCreep([WORK, MOVE], 'claimer' + Math.floor((Math.random() * 10) + 1), {role: 'claimer'}));
    }
}