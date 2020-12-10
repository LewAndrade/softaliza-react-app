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
