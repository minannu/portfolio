import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// eslint-disable-next-line react/prop-types
const TextFormatter = ({ text }) => {
  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
  );
};

export default TextFormatter;




// import React from "react";
// import formatText from "../utils/formatText";

// // eslint-disable-next-line react/prop-types
// const TextFormatter = ({ text }) => {
//   return <p>{formatText(text)}</p>;
// };

// export default TextFormatter;



// import formatText from "../utils/formatText";

// // eslint-disable-next-line react/prop-types
// const TextFormatter = ({ text }) => {
//   return <p>{formatText(text)}</p>;
// };

// export default TextFormatter;
