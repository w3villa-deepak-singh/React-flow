// outputNode.js

import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const fields = [
    { name: 'outputName', label: 'Name', type: 'text', defaultValue: id.replace('customOutput-', 'output_') },
    { name: 'outputType', label: 'Type', type: 'select', options: ['Text', 'Image'], defaultValue: 'Text' },
  ];

  const handles = [
    { id: `${id}-value`, type: 'target', position: Position.Left },
  ];

  return <BaseNode id={id} data={data} type="Output" fields={fields} handles={handles} />;
};
