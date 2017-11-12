import Event from "../data/Event";
import School from "./School"
/**
 * Does a lot of calculations and changes the players stats based on that. Creates new event.
 * @param {Player} player 
 */
export const handleEvents = (player) => {
    let thisEvent = new Event(player)
    const schoolResult = new School(player, thisEvent);
    return { ...schoolResult.getObj() };
}

