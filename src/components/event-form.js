import React, { useContext, useState } from "react";
import { Form, Grid, Button } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { EventContext } from "../context/event-context";
import { flashErrorMessage } from "./flash-message";
import { API_URL } from "../resources/connection";

const EventForm = () => {
  const [state, dispatch] = useContext(EventContext);
  const { register, errors, handleSubmit } = useForm();
  const [redirect, setRedirect] = useState(false);

  const createEvent = async (data) => {
    try {
      const response = await axios.post(API_URL + "/events", data);
      dispatch({
        type: "CREATE_EVENT",
        payload: response.data,
      });
      setRedirect(true);
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  const onSubmit = async (data) => {
    await createEvent(data);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }
  //TODO: fix data form
  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <h1 style={{ marginTop: "1em" }}>Add New Event</h1>
        <Form onSubmit={handleSubmit(onSubmit)} loading={state.loading}>
          <Form.Field className={classnames({ error: errors.title })}>
            <label htmlFor="title">
              Title
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Title"
                ref={register({ required: true, minLength: 5 })}
              />
            </label>
            <span className="error">
              {errors.title &&
                errors.title.type === "required" &&
                "You need to provide a Title"}
            </span>
            <span className="error">
              {errors.title &&
                errors.title.type === "minLength" &&
                "The Event Title must have more than 5 characters"}
            </span>
          </Form.Field>
          <Form.Field className={classnames({ error: errors.description })}>
            <label htmlFor="description">
              Description
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Description"
                ref={register({ required: true, minLength: 10 })}
              />
            </label>
            <span className="error">
              {errors.description &&
                errors.description.type === "required" &&
                "You need to provide a Description"}
            </span>
            <span className="error">
              {errors.description &&
                errors.description.type === "minLength" &&
                "Description needs to have more than 10 characters"}
            </span>
          </Form.Field>
          <Form.Field className={classnames({ error: errors.date })}>
            <label htmlFor="date">
              Date
              <input
                id="date"
                name="date"
                type="text"
                placeholder="DD/MM/YYYY hh:mm"
                ref={register({
                  required: true,
                  pattern: /^([1-9]|([012][0-9])|(3[01]))\/([0]{0,1}[1-9]|1[012])\/\d\d\d\d( * - * | *)[012]{0,1}[0-9]:[0-6][0-9]$/,
                })}
              />
            </label>
            <span className="error">
              {errors.date &&
                errors.date.type === "required" &&
                "Please set a date"}
            </span>
            <span className="error">
              {errors.date &&
                errors.date.type === "pattern" &&
                "Please set a valid date, ex: 21/06/2021 15:00"}
            </span>
          </Form.Field>
          <Form.Field className={classnames({ error: errors.email })}>
            <label htmlFor="email">
              Email
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                ref={register({
                  required: true,
                  pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                })}
              />
            </label>
            <span className="error">
              {errors.email &&
                errors.email.type === "required" &&
                "You need to provide an Email address"}
            </span>
            <span className="error">
              {errors.email &&
                errors.email.type === "pattern" &&
                "Invalid email address"}
            </span>
          </Form.Field>
          <Form.Field className={classnames({ error: errors.phone })}>
            <label htmlFor="phone">
              Phone
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Phone"
                ref={register({
                  required: true,
                  pattern: /^\+(?:[0-9] ?){6,14}[0-9]$/,
                })}
              />
            </label>
            <span className="error">
              {errors.phone &&
                errors.phone.type === "required" &&
                "You need to provide a Phone number"}
            </span>
            <span className="error">
              {errors.phone &&
                errors.phone.type === "pattern" &&
                "Phone number must be in International format"}
            </span>
          </Form.Field>
          <Form.Field className={classnames({ error: errors.url })}>
            <label htmlFor="url">
              Site Url
              <input
                id="url"
                name="url"
                type="text"
                placeholder="Site Url"
                ref={register({
                  required: true,
                  pattern: /^((https?):\/\/)?[^\s$.?#].[^\s]*$/,
                })}
              />
            </label>
            <span className="error">
              {errors.url &&
                errors.url.type === "required" &&
                "You need to provide a Site URL for the event"}
            </span>
            <span className="error">
              {errors.url &&
                errors.url.type === "pattern" &&
                "Please enter a valid url"}
            </span>
          </Form.Field>
          <Form.Field>
            <label htmlFor="address">
              Address
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Address"
                ref={register}
              />
            </label>
          </Form.Field>
          <Button primary type="submit">
            Save
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default EventForm;
