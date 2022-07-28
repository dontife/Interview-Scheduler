import React from 'react'
import "./style.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status"; 
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }
  function intDelete(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(DELETING);
    props.cancelInterview(props.id, interview).then(() => transition(EMPTY));

}

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (<Show 
      student={props.interview.student} 
      interviewer={props.interview.interviewer}
      onDelete={() => transition(CONFIRM)}
      />
      )}
      {mode === CREATE && (
        <Form
        student={null}
        interviewer={null}
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />
      )}
      {mode === SAVING && <Status message="Saving ..."/>}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onCancel={back} onConfirm={intDelete}/>}
      {mode === DELETING && <Status message="Deleting..." />}
    </article>
    )
}
