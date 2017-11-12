import React from "react";
import {Header} from "semantic-ui-react";

class Event {
    constructor(player) {
        // serves as the id for when these events occured.
        this.year = player.age
        this.ageHeader = <Header textAlign="left">{player.age} years old</Header>
        this.smallEvents = []
    }
    addSmallEvent = (smallEvent) => {
        // smallevent object is {message: "", type: ""}
        this.smallEvents.push(smallEvent)
    }
}

export default Event;