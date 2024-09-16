// imageNode.js

import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const ImageNode = ({ id, data }) => {
  const fields = [
    { name: 'imageUrl', label: 'Image URL', type: 'text', defaultValue: 'http://example.com/image.png' },
  ];

  const handles = [
    { id: `${id}-input`, type: 'target', position: Position.Left },
    { id: `${id}-output`, type: 'source', position: Position.Right },
  ];

  return <BaseNode id={id} data={data} type="Image" fields={fields} handles={handles} />;
};
