// // textNode.js

// import { useState } from 'react';
// import { Handle, Position } from 'reactflow';

// export const TextNode = ({ id, data }) => {
//   const [currText, setCurrText] = useState(data?.text || '{{input}}');

//   const handleTextChange = (e) => {
//     setCurrText(e.target.value);
//   };

//   return (
//     <div style={{width: 200, height: 80, border: '1px solid black'}}>
//       <div>
//         <span>Text</span>
//       </div>
//       <div>
//         <label>
//           Text:
//           <input 
//             type="text" 
//             value={currText} 
//             onChange={handleTextChange} 
//           />
//         </label>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={`${id}-output`}
//       />
//     </div>
//   );
// }




// textNode.js

import { BaseNode } from './baseNode';
import {Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const fields = [
    { name: 'text', label: 'Text', type: 'text', defaultValue: '{{input}}' },
  ];

  const handles = [
    { id: `${id}-output`, type: 'source', position: Position.Right },
  ];

  return <BaseNode id={id} data={data} type="Text" fields={fields} handles={handles} />;
};
