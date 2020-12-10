import React from "react";
import { Card } from "semantic-ui-react";
import EventCard from "./event-card";
const EventList = ({ events }) => {
  const cards = () => {
    return events.map((event) => {
      return <EventCard key={event.id} event={event} />;
    });
  };

  return <Card.Group>{cards()}</Card.Group>;
};

export default EventList;
