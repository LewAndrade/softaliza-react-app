import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Segment } from "semantic-ui-react";
import EventList from "../components/event-list";
import { EventContext } from "../context/event-context";
import { FlashMessage, flashErrorMessage } from "../components/flash-message";
import { API_URL } from "../resources/connection";
const EventListPage = () => {
  const [state, dispatch] = useContext(EventContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + "/events");
        dispatch({
          type: "FETCH_EVENTS",
          payload: response.data,
        });
      } catch (error) {
        flashErrorMessage(dispatch, error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <Segment textAlign="center">
        <h1>Lista de Eventos</h1>
      </Segment>
      {state.message.content && <FlashMessage message={state.message} />}
      <EventList events={state.events} />
    </div>
  );
};

export default EventListPage;
