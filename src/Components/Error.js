import React from "react";
// from https://github.com/leighhalliday/react-forms-demo/tree/master/src

const Error = ({ touched, message }) => {
  if (!touched) {
    return <p className="form-message invalid">&nbsp;</p>;
  }
  if (message) {
    return <p className="form-message invalid">{message}</p>;
  }
  return <p className="form-message valid"><span role="img" aria-label="thumbs up">👍</span> All good</p>;
};

export default Error;
