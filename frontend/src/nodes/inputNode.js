
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
