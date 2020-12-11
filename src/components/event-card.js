import React from "react";
import axios from "axios";
import { Card, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { EventContext } from "../context/event-context";
import { flashErrorMessage } from "./flash-message";
import { API_URL } from "../resources/connection";

const { useContext } = React;

const EventCard = ({ event }) => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(EventContext);

  const deleteEvent = async (id) => {
    try {
      const response = await axios.delete(API_URL + `/events/${id}`);
      dispatch({
        type: "DELETE_EVENT",
        payload: response.data,
      });
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  const event_type = () => {
    if (event.address && event.url) {
      return (
        <>
          <p>
            <Icon name="map marker alternate" /> {event.address} <br />
          </p>
          <p>
            <Icon name="at" /> {event.url}
          </p>
        </>
      );
    } else if (event.address || event.url) {
      if (event.address) {
        return (
          <p>
            <Icon name="map marker alternate" /> {event.address} <br />
          </p>
        );
      } else if (event.url) {
        return (
          <p>
            <Icon name="at" /> {event.url}
          </p>
        );
      }
    }
  };

  return (
    <Card centered link raised>
      <Card.Content>
        <Card.Header>
          <Icon name="calendar check outline" /> {event.title}
        </Card.Header>
        <Card.Description>
          <p>{event.description}</p>
          <p>
            <Icon name="calendar alternate outline" /> {event.date}
          </p>
          <p>
            <Icon name="envelope" /> {event.email}
          </p>
          <p>
            <Icon name="phone" /> {event.phone}
          </p>
          {event_type()}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="blue" as={Link} to={`events/edit/${event.id}`}>
            Edit
          </Button>
          <Button basic color="red" onClick={() => deleteEvent(event.id)}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default EventCard;
