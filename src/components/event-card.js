import React from "react";
import { Card, Button, Icon } from "semantic-ui-react";

const EventCard = ({ event }) => {
  const event_date = () => {
    var date = new Date(event.date);
    return date.toLocaleString();
  };

  const event_type = () => {
    switch (event.type) {
      case 1:
        return (
          <p>
            <Icon name="map marker alternate" /> {event.address}
          </p>
        );
      case 2:
        return (
          <p>
            <Icon name="at" /> {event.url}
          </p>
        );
      case 3:
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
      default:
        break;
    }
  };

  return (
    <Card centered link raised href={`/events/${event.id}`}>
      <Card.Content>
        <Card.Header>
          <Icon name="calendar check outline" /> {event.title}
        </Card.Header>
        <Card.Description>
          <p>{event.description}</p>
          <p>
            <Icon name="calendar alternate outline" /> {event_date()}
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
          <Button basic color="blue">
            Edit
          </Button>
          <Button basic color="red">
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default EventCard;
