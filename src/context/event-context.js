import React, { useReducer, createContext } from "react";

export const EventContext = createContext();

const initialState = {
  events: [],
  event: {}, // selected or new
  message: {}, // { type: 'success|fail', title:'Info|Error' content:'lorem ipsum'}
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_EVENTS": {
      return {
        ...state,
        events: action.payload,
      };
    }
    case "CREATE_EVENT": {
      return {
        ...state,
        events: [...state.events, action.payload],
        message: {
          type: "success",
          title: "Success",
          content: "New Event created !!",
        },
      };
    }
    case "FETCH_EVENT": {
      return {
        ...state,
        event: action.payload,
      };
    }
    case "UPDATE_EVENT": {
      const event = action.payload;
      return {
        ...state,
        events: state.events.map((item) =>
          item.id === event.id ? event : item
        ),
        message: {
          type: "success",
          title: "Update Successful",
          content: `Event "${event.title}" has been updated!`,
        },
      };
    }
    case "DELETE_EVENT": {
      const { id, title } = action.payload;
      return {
        ...state,
        events: state.events.filter((item) => item.id !== id),
        message: {
          type: "success",
          title: "Delete Successful",
          content: `Event "${title} has been deleted!"`,
        },
      };
    }
    case "FLASH_MESSAGE": {
      return {
        ...state,
        message: action.payload,
      };
    }
    default:
      throw new Error();
  }
}

export const EventContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <EventContext.Provider value={[state, dispatch]}>
      {children}
    </EventContext.Provider>
  );
};
