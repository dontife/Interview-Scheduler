import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import DayListItem from "../src/components/DayListItem"

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
  .add("Unselected", () => <DayListItem name ="Monday" spots={5} />)
  .add("Selected", () => <DayListItem name ="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name ="Monday" spots={0} />)
  .add("Clickable", () => <DayListItem name ="Tuesday" setDay={action("setDay")} spots={5} />)


  
