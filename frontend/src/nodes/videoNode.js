// videoNode.js

import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const VideoNode = ({ id, data }) => {
  const fields = [
    { name: 'videoFile', label: 'Video File', type: 'text', defaultValue: 'video.mp4' },
  ];

  const handles = [
    { id: `${id}-input`, type: 'target', position: Position.Left },
    { id: `${id}-output`, type: 'source', position: Position.Right },
  ];

  return <BaseNode id={id} data={data} type="Video" fields={fields} handles={handles} />;
};
