// fileNode.js

import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const FileNode = ({ id, data }) => {
  const fields = [
    { name: 'fileName', label: 'File Name', type: 'text', defaultValue: 'document.pdf' },
  ];

  const handles = [
    { id: `${id}-input`, type: 'target', position: Position.Left },
    { id: `${id}-output`, type: 'source', position: Position.Right },
  ];

  return <BaseNode id={id} data={data} type="File" fields={fields} handles={handles} />;
};
