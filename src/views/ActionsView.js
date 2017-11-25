import React, { Component } from "react";
import {
  Button,
  Icon,
  Header,
  Checkbox,
  Modal,
  List,
  Popup
} from "semantic-ui-react";
import _ from "lodash";
class EventsView extends Component {
  constructor() {
    super();
    this.state = { openLeisureModal: false };
  }
  createLeisureEvent(leisureActivity) {
    const { player } = this.props;
    const message = leisureActivity.active
      ? `${player.name} will ${leisureActivity.verb} during ${
          player.pronoun
        } leisure time.`
      : `${player.name} will no longer ${leisureActivity.verb} during ${
          player.pronoun
        } leisure time.`;
    return { message };
  }

  onCheckboxClick = activity => {
    const {
      player,
      updatePlayer,
      currentEvent,
      updateCurrentEvent
    } = this.props;
    const tempPlayer = _.cloneDeep(player);
    const tempCurrEvent = _.cloneDeep(currentEvent);
    tempPlayer.actions.LeisureTime.toggleLeisureTime(activity);
    if (!_.isEqual(tempPlayer, player)) {
      // update state only if it changed.
      tempCurrEvent.addSmallEvent(
        this.createLeisureEvent(tempPlayer.actions.LeisureTime[activity])
      );
      updateCurrentEvent(tempCurrEvent);
      updatePlayer(tempPlayer);
    }
  };
  toggleLeisureModal = () =>
    this.setState({ openLeisureModal: !this.state.openLeisureModal });

  disableLeisureCheckbox = leisureActivity => {
    const { player } = this.props;
    if (
      player.age <= leisureActivity.minAge ||
      player.age >= leisureActivity.maxAge
    ) {
      return false;
    }
    return true;
  };

  leisureModal = () => {
    const { player } = this.props;
    return (
      <Modal
        size="mini"
        open={this.state.openLeisureModal}
        onClose={this.toggleLeisureModal}
      >
        <Modal.Header>Leisure Time</Modal.Header>
        <Modal.Content>
          <List>
            <Header as="h3">
              Available: {player.actions.LeisureTime.available}
            </Header>
            {Object.keys(player.actions.LeisureTime).map(key => {
              if (typeof player.actions.LeisureTime[key] !== "object") {
                return false;
              }
              return (
                <List.Item key={key}>
                  <Checkbox
                    toggle
                    checked={player.actions.LeisureTime[key].active}
                    onClick={() => {
                      this.onCheckboxClick(key);
                    }}
                    label={player.actions.LeisureTime[key].name}
                    disabled={
                      !this.disableLeisureCheckbox(
                        player.actions.LeisureTime[key]
                      )
                    }
                  />
                  <Popup
                    trigger={<Icon name="question" className="popup-info" />}
                    content={player.actions.LeisureTime[key].description}
                  />
                </List.Item>
              );
            })}
          </List>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.toggleLeisureModal} primary>
            Confirm
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };
  render() {
    return (
      <div>
        <Header as="h2">
          Actions let you decide what to do thru out your life.
        </Header>
        <Button.Group>
          <Button onClick={this.toggleLeisureModal}>
            <Icon name="lightning" /> Leisure Time
          </Button>
          <Button onClick={this.toggleLeisureModal}>
            <Icon name="blind" /> Walk for a Walk
          </Button>
          <Button onClick={this.toggleLeisureModal}>
            <Icon name="lightning" /> Suicide
          </Button>
          <Button onClick={this.toggleLeisureModal}>
            <Icon name="heterosexual" /> Sexuality
          </Button>
          <Button onClick={this.toggleLeisureModal}>
            <Icon name="dollar" /> Gamble
          </Button>
          <Button onClick={this.toggleLeisureModal}>
            <Icon name="lab" /> Go Clubbing
          </Button>
        </Button.Group>
        {this.leisureModal()}
      </div>
    );
  }
}

export default EventsView;
