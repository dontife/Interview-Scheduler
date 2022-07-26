import React,  { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import DayListItem from "../src/components/DayListItem";
import DayList from "../src/components/DayList";
import InterviewerListItem from "../src/components/InterviewerListItem";
import InterviewerList from "../src/components/InterviewerList";
import Appointment from "../src/components/appointment/index";
import Header from "../src/components/appointment/Header";
import Empty from "../src/components/appointment/Empty";
import Show from "../src/components/appointment/Show";
import Confirm from "../src/components/appointment/Confirm";
import Status from "../src/components/appointment/Status";
import Error from "../src/components/appointment/Error";
import Form from "../src/components/appointment/Form";

import "index.scss";

import Button from "components/Button";

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

  // Initiates storybook and register our DayList component
storiesOf("DayListItem", module)
  // provides the default background color for our component
  .addParameters({
    backgrounds: [{name: "dark", value:"#222f3e", default:true }]
  })
  // To define our stories, we call add() once for each of our test states to generate a story
  .add("Unselected", () => <DayListItem  name ="Monday" spots={5} />)
  .add("Selected", () => <DayListItem name ="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name ="Monday" spots={0} />)
  .add("Clickable", () => <DayListItem name ="Tuesday" setDay={action("setDay")} spots={5} />)

  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];

  storiesOf("DayList", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
    })
    .add("Monday", () => 
      <DayList days={days} value={"Monday"} onChange={action("setDay")} />
    )
    .add("Tuesday", () => 
      <DayList days={days} value={"Tuesday"} onChange={action("setDay")} />
    )
    .add("Wednesday", () => 
      <DayList days={days} value={"wednesday"} onChange={action("setDay")} />
    );

    const interviewer = {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    };
    
    // Initiates storybook and register our InterviewList component
    storiesOf("InterviewerListItem", module)
      .addParameters({
        backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
      })
      .add("Unselected", () => 
        <InterviewerListItem
         id={interviewer.id}
         name={interviewer.name}
         avatar={interviewer.avatar}
        />
      )
      .add("Selected", () => 
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected
        />
      )
      .add("Clickable", () => 
        <InterviewerListItem
          name={interviewer.name}
          avatar={interviewer.avatar}
          setInterviewer={() => action("setInterviewer")(interviewer.id)}
    />
      );


const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
    />
  ))
  .add("Selected", () => (
    <InterviewerList
      interviewers={interviewers}
      value={3}
    />
  ))
  .add("Clickable", () => (
    <InterviewerList
      interviewers={interviewers}
      onChange={action("setInterviewer")}
    />
  ));

storiesOf('Appointment', module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => <Appointment />)
  .add("Appointment with Time", () => <Appointment time='12pm'/>)
  .add("Header", () => <Header time='12pm'/>)
  .add("Empty", () => <Empty  onAdd={action("onAdd")} />)
    // Initiates storybook and register our Show component
  .add("Show", () => <Show student='Lydia Miller-Jones' interviewer={interviewers} onEdit={action("onEdit")} onDelete={action("onDelete")} />)
  .add("Confirm", () => <Confirm  message="Delete the appointment?" onConfirm={action("onConfirm")} onCancel={action("onCancel")}/>)
  .add("Status", () => <Status message="Deleting"/>)
  .add("Error", () => <Error message="Could not delete appointment" onClose={action("onClose")}/>)
  .add("Create", () => <Form interviewers={interviewers}  onSave={action("onSave")}  onCancel={action("onCancel")} ></Form>)
  .add("Edit", () => <Form student='Boluwatife' interviewer={1} interviewers={interviewers} onSave={action("onSave")}  onCancel={action("onCancel")}/> )
  .add("Appointmemt Empty", () => (
    <Fragment>
      <Appointment id={1} time="4pm" />
      <Appointment time="5pm" />
    </Fragment>  
  ))
  .add("Appointment Booked", () => (
    <Fragment>
      <Appointment
        id={1}
        time="4pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
      />
      <Appointment time="5pm" />
    </Fragment>
  ));