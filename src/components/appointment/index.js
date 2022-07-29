import React from 'react'
import "./style.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form";
import Status from "./Status"; 
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM"
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
  );
  const edit = function () {
    transition(EDIT);
  };
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true));;
  }
  function intDelete(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(DELETING, true);
    props
      .cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));

}

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (<Show 
      student={props.interview.student} 
      interviewer={props.interview.interviewer}
      onDelete={() => transition(CONFIRM)}
      onEdit={edit}
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
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Something went wrong. Couldn't save it."
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Something went wrong. Couldn't delete it."
          onClose={() => back()}
        />
      )}
    </article>
    )
}
