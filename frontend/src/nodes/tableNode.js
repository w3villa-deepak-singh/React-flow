// tableNode.js

import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const TableNode = ({ id, data }) => {
  const fields = [
    { name: 'columns', label: 'Columns', type: 'text', defaultValue: 'name, age, city' },
  ];

  const handles = [
    { id: `${id}-input`, type: 'target', position: Position.Left },
    { id: `${id}-output`, type: 'source', position: Position.Right },
  ];

  return <BaseNode id={id} data={data} type="Table" fields={fields} handles={handles} />;
};
