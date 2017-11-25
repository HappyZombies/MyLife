import React, { Component } from "react";
import { Header, Progress, Popup, Label } from "semantic-ui-react";
import { StatsConstants } from "./constants";

class StatsView extends Component {
  render() {
    const { player } = this.props;
    return (
      <div>
        <Header>{player.name}</Header>
        <Progress
          percent={player.happiness.toFixed(1)}
          label="Happiness"
          progress
          indicating
        />
        <Progress
          percent={player.appearance.toFixed(1)}
          label="Appearance"
          progress
          indicating
        />
        <Progress
          percent={player.fitness.toFixed(1)}
          label="Fitness"
          progress
          indicating
        />
        <Progress
          percent={player.intelligence.toFixed(1)}
          label="Intelligence"
          progress
          indicating
        />
      </div>
    );
  }
}

export default StatsView;
