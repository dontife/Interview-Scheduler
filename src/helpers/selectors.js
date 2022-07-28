
export function getAppointmentsForDay(state, day) {
    //... returns an array of appointments for that day
    let appointmentsForDay = [];
    const nameOfDay = day;
    const selectedDay = state.days.filter(day => day.name === nameOfDay)[0];
    // If there are no appointments on the given day, our days data will be empty
    if (!selectedDay) {
      return appointmentsForDay;
  
    }
    for (const appointment of selectedDay.appointments) {
      appointmentsForDay.push(appointment);
    }
    appointmentsForDay = appointmentsForDay.map(appointment => state.appointments[appointment]);

    return appointmentsForDay;
}

export function getInterviewersForDay(state, day) {
  const dayList = state.days.filter((d) => d.name === day);

  if (dayList.length === 0) {
    return [];
  }
  const filteredList = dayList[0].interviewers.map(
    (d) => state.interviewers[d]
  );
  return filteredList;
}


export function getInterview(state, interview) {

    if(interview){
       let interviewer = Object.values(state.interviewers).find(interviewer =>  interviewer.id === interview.interviewer)
        return  {  
          "student": interview.student,
          "interviewer": interviewer
        }    
    } 
    return null;
}