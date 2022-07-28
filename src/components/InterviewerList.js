import React from 'react'
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';
import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {
    const listInterview = props.interviewers.map((interview) => {
        return (
            <InterviewerListItem
              key ={interview.id}
              name ={interview.name}
              avatar={interview.avatar}
              selected = {interview.id === props.value}
              setInterviewer={() => props.onChange(interview.id)}
            />
        )

    })
    return (
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">
          {listInterview} 
        </ul>
      </section>
    )
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

