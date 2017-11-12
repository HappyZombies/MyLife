import React, { Component } from 'react';
import { Tab } from "semantic-ui-react";
import _ from "lodash";
import { handleEvents } from "./utils";
import EventsView from "./views/EventsView";
import StatsView from "./views/StatsView";
import SettingsView from "./views/SettingsView";
import ActionsView from "./views/ActionsView";
import Player from "./data/Player";
import Event from "./data/Event";
import './App.css';

/**
 * Main App contains all the updating of players stats and what happens in the world.
 */
class App extends Component {

  constructor() {
    super();
    const player = new Player();
    const currentEvent = new Event(player);
    currentEvent.addSmallEvent({ message: `You were born a ${player.gender}, in ${player.country}` });
    currentEvent.addSmallEvent({ message: `Your name is ${player.name}` });

    this.state = { player: player, openModal: true, events: [currentEvent], currentEvent: currentEvent };

  }

  panes = () => {
    return (
      [
        {
          menuItem: { key: 'home', icon: 'user' },
          render: () => <Tab.Pane className="eventsView" attached={false}><EventsView events={this.state.events} increaseAge={this.increaseAge} /></Tab.Pane>
        },
        {
          menuItem: { key: 'education', icon: 'graduation', disabled: true },
          render: () => <Tab.Pane attached={false}><SettingsView /></Tab.Pane>
        },
        {
          menuItem: { key: 'career', icon: 'briefcase', disabled: true },
          render: () => <Tab.Pane attached={false}><SettingsView /></Tab.Pane>
        },
        {
          menuItem: { key: 'love', icon: 'heart', disabled: true },
          render: () => <Tab.Pane attached={false}><SettingsView /></Tab.Pane>
        },
        {
          menuItem: { key: 'housing', icon: 'home', disabled: true },
          render: () => <Tab.Pane attached={false}><SettingsView /></Tab.Pane>
        },
        {
          menuItem: { key: 'stats', icon: 'bar graph' },
          render: () => <Tab.Pane attached={false}><StatsView player={this.state.player} /></Tab.Pane>
        },
        {
          menuItem: { key: 'misc', icon: 'clipboard' },
          render: () => {
            return (
              <Tab.Pane attached={false}>
                <ActionsView
                  player={this.state.player}
                  updatePlayer={this.updatePlayer}
                  currentEvent={this.state.currentEvent}
                  updateCurrentEvent={this.updateCurrentEvent}
                />
              </Tab.Pane>)
          }
        },
        {
          menuItem: { key: 'settings', icon: 'cogs' },
          render: () => <Tab.Pane attached={false}><SettingsView /></Tab.Pane>
        }
      ]
    )
  }

  /**
   * Based on the stats and world events, this will calculate the events that occur.
   * Based on these events, it will update the player object.
   */
  _calculateEvents = () => {
    // increse age
    const tempPlayer = _.clone(this.state.player);
    tempPlayer.age++;

    // update states.
    const obj = handleEvents(tempPlayer);
    const tempEvents = this.state.events.slice();
    tempEvents.push(obj.event);
    this.setState({ events: tempEvents, player: obj.player, currentEvent: obj.event });
  }

  closeModal = () => this.setState({ openModal: false })

  increaseAge = () => {
    document.getElementById("eventsView").scrollTo(0, document.body.scrollHeight);
    this._calculateEvents();
  }

  updatePlayer = (player) => this.setState({ player })

  updateCurrentEvent = (event) => this.setState({ event })

  render() {
    return (
      <div>
        <Tab menu={{ secondary: true }} panes={this.panes()} />
        {/* {this.birthModal()} */}
      </div>
    );
  }
}

export default App;
