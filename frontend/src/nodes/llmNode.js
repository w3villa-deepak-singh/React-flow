// // llmNode.js

// import { Handle, Position } from 'reactflow';

// export const LLMNode = ({ id, data }) => {

//   return (
//     <div style={{width: 200, height: 80, border: '1px solid black'}}>
//       <Handle
//         type="target"
//         position={Position.Left}
//         id={`${id}-system`}
//         style={{top: `${100/3}%`}}
//       />
//       <Handle
//         type="target"
//         position={Position.Left}
//         id={`${id}-prompt`}
//         style={{top: `${200/3}%`}}
//       />
//       <div>
//         <span>LLM</span>
//       </div>
//       <div>
//         <span>This is a LLM.</span>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={`${id}-response`}
//       />
//     </div>
//   );
// }



// llmNode.js

import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {
  const fields = [
    { name: 'llmSystem', label: 'System', type: 'text', defaultValue: 'OpenAI' },
  ];

  const handles = [
    { id: `${id}-system`, type: 'target', position: Position.Left, style: { top: '33%' } },
    { id: `${id}-prompt`, type: 'target', position: Position.Left, style: { top: '66%' } },
    { id: `${id}-response`, type: 'source', position: Position.Right },
  ];

  return <BaseNode id={id} data={data} type="LLM" fields={fields} handles={handles} />;
};
