var externRoomPerSpawn = {
    Home: 'E12N14',
    Outpost1: 'E11N12',
    Outpost2: 'E11N13'
};

module.exports = function (creep, homeSpawn) {
    if (!creep.memory.homeSpawnId) {
        var targetRoomName = externRoomPerSpawn[homeSpawn.name];

        creep.memory.homeSpawnId = homeSpawn.id;
        creep.memory.targetRoomName = targetRoomName;
    }

    if (creep.carry.energy < creep.carryCapacity) {
        if (creep.room.name != creep.memory.targetRoomName) {
            var targetRoomPos = new RoomPosition(10,10, creep.memory.targetRoomName);
            creep.moveTo(targetRoomPos);
        } else {
            var source = creep.pos.findClosestByRange(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    } else {
        var homeSpawn = Game.getObjectById(creep.memory.homeSpawnId);
        if (creep.transferEnergy(homeSpawn) == ERR_NOT_IN_RANGE) {
            creep.moveTo(homeSpawn);
        }
    }
};