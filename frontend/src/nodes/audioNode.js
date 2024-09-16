// audioNode.js

import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const AudioNode = ({ id, data }) => {
  const fields = [
    { name: 'audioFile', label: 'Audio File', type: 'text', defaultValue: 'audio.mp3' },
  ];

  const handles = [
    { id: `${id}-input`, type: 'target', position: Position.Left },
    { id: `${id}-output`, type: 'source', position: Position.Right },
  ];

  return <BaseNode id={id} data={data} type="Audio" fields={fields} handles={handles} />;
};
