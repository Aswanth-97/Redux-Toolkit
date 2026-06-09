import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";

const TimeAgo = ({timeStamp}) => {
  let TimeAgo = "";

  if (timeStamp) {
    const date = parseISO(timeStamp);

    const timeDif = formatDistanceToNow(date);
    TimeAgo = `${timeDif} Ago`;
  }

  return (
    <>
      <span title={timeStamp}>
        &nbsp; <i>{TimeAgo}</i>
      </span>
    </>
  );
};

export default TimeAgo;
