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
import { useEffect, useState } from 'react';
import { BaseNode } from './baseNode';
import {Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [textData, setTextData] = useState(data.text || '{{input}}');

  const [handles, setHandles] = useState([
    { id: `${id}-output`, type: 'source', position: Position.Right },
  ]);

  const fields = [
    { name: 'text', label: 'Text', type: 'text', defaultValue: '{{input}}' },
  ];

  // const handles = [
  //   { id: `${id}-output`, type: 'source', position: Position.Right },
  // ];
   
   
   // 1. Function to extract variables from the text input
   const extractVariablesFromText = (text) => {
    const variablePattern = /\{\{(.*?)\}\}/g;
    const matches = [...text.matchAll(variablePattern)];
    const variableNames = matches.map(match => match[1].trim()); // Extract variable names and trim spaces
    return variableNames;
  };

  // 2. Function to validate if the variable name is a valid JS identifier
  const isValidVariableName = (name) => {
    return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name);
  };

    // // 3. UseEffect to update handles based on text input
    // useEffect(() => {
    //   const textValue = data.text || fields[0].defaultValue;
    //   const variables = extractVariablesFromText(textValue);
      
    //   // Filter valid variables
    //   const validVariables = variables.filter(isValidVariableName);
      
    //   // Create a new handle for each valid variable on the left side
    //   const newHandles = validVariables.map((variable, index) => ({
    //     id: `${id}-input-${variable}-${index}`,
    //     type: 'target',
    //     position: Position.Left,
    //     style: { top: 50 + index * 20 }, // Adjust positioning for multiple handles
    //   }));
      
    //   // Always include the right output handle
    //   newHandles.push({ id: `${id}-output`, type: 'source', position: Position.Right });
      
    //   // Update handles state
    //   setHandles(newHandles);
    // }, [data.text, id]);
  

     // Update handles whenever textData changes
  useEffect(() => {
    const variables = extractVariablesFromText(textData);
    
    // Filter valid variables
    const validVariables = variables.filter(isValidVariableName);

    // Create a new handle for each valid variable on the left side
    const newHandles = validVariables.map((variable, index) => ({
      id: `${id}-input-${variable}-${index}`,
      type: 'target',
      position: Position.Left,
      style: { top: 50 + index * 20 }, // Adjust positioning for multiple handles
    }));

    // Always include the right output handle
    newHandles.push({ id: `${id}-output`, type: 'source', position: Position.Right });

    // Update handles state
    setHandles(newHandles);
  }, [textData, id]);
   

   // Update textData when input field changes
   const handleFieldChange = (fieldName, newValue) => {
    if (fieldName === 'text') {
      setTextData(newValue);
    }
  };



 
  return <BaseNode id={id} data={{ text: textData }} type="Text" fields={fields} handles={handles} onFieldChange={handleFieldChange} />;

  // return <BaseNode id={id} data={data} type="Text" fields={fields} handles={handles} />;
};
