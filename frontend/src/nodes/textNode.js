
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
   
   
   //  to extract variables from the text input
   const extractVariablesFromText = (text) => {
    const variablePattern = /\{\{(.*?)\}\}/g;
    const matches = [...text.matchAll(variablePattern)];
    const variableNames = matches.map(match => match[1].trim());
    return variableNames;
  };

  
  const isValidVariableName = (name) => {
    return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name);
  };

  
  useEffect(() => {
    const variables = extractVariablesFromText(textData);
    
    // Filter valid variables
    const validVariables = variables.filter(isValidVariableName);

    // Create a new handle for each valid variable on the left side
    const newHandles = validVariables.map((variable, index) => ({
      id: `${id}-input-${variable}-${index}`,
      type: 'target',
      position: Position.Left,
      style: { top: 50 + index * 20 }, 
    }));

    
    newHandles.push({ id: `${id}-output`, type: 'source', position: Position.Right });

    // Update handles state
    setHandles(newHandles);
  }, [textData, id]);
   

   
   const handleFieldChange = (fieldName, newValue) => {
    if (fieldName === 'text') {
      setTextData(newValue);
    }
  };



 
  return <BaseNode id={id} data={{ text: textData }} type="Text" fields={fields} handles={handles} onFieldChange={handleFieldChange} />;


};











