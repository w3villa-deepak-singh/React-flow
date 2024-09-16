// // inputNode.js

// import { useState } from 'react';
// import { Handle, Position } from 'reactflow';

// export const InputNode = ({ id, data }) => {
//   const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
//   const [inputType, setInputType] = useState(data.inputType || 'Text');

//   const handleNameChange = (e) => {
//     setCurrName(e.target.value);
//     console.log("currname", currName);
//   };

//   const handleTypeChange = (e) => {
//     setInputType(e.target.value);
//     console.log("inputType", inputType);
//   };

//   return (
//     <div style={{width: 200, height: 80, border: '1px solid black'}}>
//       <div>
//         <span>Input</span>
//       </div>
//       <div>
//         <label>
//           Name:
//           <input 
//             type="text" 
//             value={currName} 
//             onChange={handleNameChange} 
//           />
//         </label>
//         <label>
//           Type:
//           <select value={inputType} onChange={handleTypeChange}>
//             <option value="Text">Text</option>
//             <option value="File">File</option>
//           </select>
//         </label>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={`${id}-value`}
//       />
//     </div>
//   );
// }



// inputNode.js

import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  const fields = [
    { name: 'inputName', label: 'Name', type: 'text', defaultValue: id.replace('customInput-', 'input_') },
    { name: 'inputType', label: 'Type', type: 'select', options: ['Text', 'File'], defaultValue: 'Text' },
  ];

  const handles = [
    { id: `${id}-value`, type: 'source', position: Position.Right },
  ];

  return <BaseNode id={id} data={data} type="Input" fields={fields} handles={handles} />;
};
