import React from "react";

// Function to format Markdown-like text
const formatText = (text) => {
  // Regex to match markdown patterns: bold, italic, links, inline code, strikethrough
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(https?:\/\/.*?\)|`.*?`|~~.*?~~)/);

  return parts.map((part, index) => {
    if (part.match(/^\*\*(.*?)\*\*$/)) {
      // Bold pattern: **bold text**
      return (
        <strong key={index}>
          {part.replace(/\*\*/g, "")} {/* Remove the ** */}
        </strong>
      );
    } else if (part.match(/^\*(.*?)\*$/)) {
      // Italic pattern: *italic text*
      return (
        <em key={index}>
          {part.replace(/\*/g, "")} {/* Remove the * */}
        </em>
      );
    } else if (part.match(/^\[.*?\]\(https?:\/\/.*?\)$/)) {
      // Link pattern: [link text](url)
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      return (
        <a key={index} href={match[2]} target="_blank" rel="noopener noreferrer">
          {match[1]}
        </a>
      );
    } else if (part.match(/^`(.*?)`$/)) {
      // Inline code pattern: `code`
      return (
        <code key={index}>
          {part.replace(/`/g, "")} {/* Remove the ` */}
        </code>
      );
    } else if (part.match(/^~~(.*?)~~$/)) {
      // Strikethrough pattern: ~~strikethrough text~~
      return (
        <del key={index}>
          {part.replace(/~~/g, "")} {/* Remove the ~~ */}
        </del>
      );
    }
    // Return plain text for everything else
    return <span key={index}>{part}</span>;
  });
};

export default formatText;



// const formatText = (text) => {
//   // Regex to split the text into bold patterns, link patterns, and plain text
//   const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/);

//   return parts.map((part, index) => {
//     if (part.match(/^\*\*(.*?)\*\*$/)) {
//       // Bold pattern: **bold text**
//       return (
//         <strong key={index}>
//           {part.replace(/\*\*/g, "")} {/* Remove the ** */}
//         </strong>
//       );
//     } else if (part.match(/^\[.*?\]\(.*?\)$/)) {
//       // Link pattern: [link text](url)
//       const match = part.match(/\[(.*?)\]\((.*?)\)/);
//       return (
//         <a
//           key={index}
//           href={match[2]}
//           target="_blank"
//           rel="noopener noreferrer">
//           {match[1]}
//         </a>
//       );
//     }
//     // Return plain text for everything else
//     return <span key={index}>{part}</span>;
//   });
// };

// export default formatText;

