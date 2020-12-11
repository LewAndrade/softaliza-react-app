import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import EventForm from "../components/event-form";
import { flashErrorMessage } from "../components/flash-message";
import { EventContext } from "../context/event-context";
import { API_URL } from "../resources/connection";

const EventFormPage = ({ match }) => {
  const [state, dispatch] = useContext(EventContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { id } = match.params; // Grab URL id

    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(API_URL + `/events/${id}`);
          dispatch({
            type: "FETCH_EVENT",
            payload: response.data,
          });
          setLoading(false);
        } catch (error) {
          flashErrorMessage(dispatch, error);
        }
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, [match.params, dispatch]);

  if (loading) {
    return <p>Please wait...</p>;
  }

  return (
    <div>
      <EventForm event={state.event} />
    </div>
  );
};

export default EventFormPage;
