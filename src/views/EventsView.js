import React, { Component } from 'react';
import { Button, List } from "semantic-ui-react";
class EventsView extends Component {
    displayEvent = () => {
        return this.props.events.map((event, i) => {
            return (
                <div key={i}>
                    {event.ageHeader}
                    {<List>
                        {event.smallEvents.map((smallEvent, i) =>
                            <List.Item key={i}>{smallEvent.message}</List.Item>
                        )}
                    </List>}
                </div>
            )
        })
    }
    render() {
        return (
            <div id="eventsView" style={{ overflow: "auto", height: "400px" }}>
                {this.displayEvent()}
                <Button icon="plus" onClick={this.props.increaseAge} circular color="green" className="buttonPosition" />
            </div>
        );
    }
}

export default EventsView;
