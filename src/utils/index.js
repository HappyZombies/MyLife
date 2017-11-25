import Event from "../data/Event";
import School from "./School";
import _ from "lodash";
/**
 * Does a lot of calculations and changes the players stats based on that. Creates new event.
 * @param {Player} player
 */
export const handleActivities = player => {
  let thisEvent = new Event(player);
  let tempPlayer = _.clone(player);
  const allActivies = tempPlayer.activities;
  allActivies.forEach(activity => {
    activity.executeActivity(player, thisEvent);
    thisEvent = activity.getEvent();
    tempPlayer = activity.getPlayer();
  });
  return { event: thisEvent, player: tempPlayer };
};
