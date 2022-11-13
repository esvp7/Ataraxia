import React from "react";

const PriorityStars = ({ priority }) => {
  const stars = priority * 1;
  const arr = [];
  for (let i = 1; i <= stars; i++) {
    arr.push(<div key={i} style={{color: '#ca2100'}}>❂</div>);
  }
  return <>{arr}</>
};

export default PriorityStars;