var externRoomPerSpawn = {
    Home: 'E12N14',
    Outpost1: 'E11N12',
    Outpost2: 'E11N13'
};

var moveOptions = {
    reusePath: 10,
    ignoreCreeps: true
};

module.exports = function(creep, homeSpawn) {
    if (!creep.memory.targetRoomName) {
        creep.memory.targetRoomName = externRoomPerSpawn[homeSpawn.name];
    }

    if (creep.carry.energy < creep.carryCapacity) {
        if (creep.room.name != creep.memory.targetRoomName) {
            var targetRoomPos = new RoomPosition(25,25, creep.memory.targetRoomName);
            var startCpu = Game.getUsedCpu();
            creep.moveTo(targetRoomPos, moveOptions);
            var delta = Game.getUsedCpu() - startCpu; if (delta > 10) console.log(creep.name, delta.toFixed(1), '[' + creep.pos.roomName + ' -> ' + targetRoomPos.roomName + ' (to target room)]');
        } else {
            var source = creep.pos.findClosestByRange(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                var startCpu = Game.getUsedCpu();
                creep.moveTo(source, moveOptions);
                var delta = Game.getUsedCpu() - startCpu; if (delta > 10) console.log(creep.name, delta.toFixed(1), '[' + creep.pos.roomName + ' -> ' + source.pos.roomName + ' (to source)]');
            }
        }
    } else {
        var homeSpawn = Game.getObjectById(creep.memory.homeSpawnId);
        if (creep.transferEnergy(homeSpawn) == ERR_NOT_IN_RANGE) {
            var startCpu = Game.getUsedCpu();
            creep.moveTo(homeSpawn, moveOptions);
            var delta = Game.getUsedCpu() - startCpu; if (delta > 10) console.log(creep.name, delta.toFixed(1), '[' + creep.pos.roomName + ' -> ' + homeSpawn.pos.roomName + ' (to home)]');
        }
    }
};