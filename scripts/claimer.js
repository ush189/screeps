/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('claimer'); // -> 'a thing'
 */
module.exports = function(creep) {
    if (creep.room.controller && !creep.room.controller.my) {
        if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    } else if (Game.flags.FlagClaim) {
        creep.moveTo(Game.flags.FlagClaim)
    }
}