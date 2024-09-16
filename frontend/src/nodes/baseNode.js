// // baseNode.js

// import { useState } from 'react';
// // import { Handle, Position } from 'reactflow';
// import { Handle } from 'reactflow';

// export const BaseNode = ({ id, data, type, handles, fields }) => {
//   // Initialize field states based on provided data or defaults
//   console.log("id", id);
//   console.log("data", data);
//   console.log("type", type);
//   console.log("handles", handles);
//   console.log("fields", fields);


//   const initialStates = fields.reduce((acc, field) => {
//     acc[field.name] = useState(data[field.name] || field.defaultValue);
//     return acc;
//   }, {});

//   const handleFieldChange = (fieldName, newValue) => {
//     initialStates[fieldName][1](newValue);
//   };

//   return (
//     <div style={{ width: 200, height: 100, border: '1px solid black', padding: '10px', borderRadius: '4px' }}>
//       <div>
//         <span>{type}</span>
//       </div>
//       <div>
//         {fields.map((field) => (
//           <label key={field.name} style={{ display: 'block', marginBottom: '5px' }}>
//             {field.label}:
//             {field.type === 'text' && (
//               <input
//                 type="text"
//                 value={initialStates[field.name][0]}
//                 onChange={(e) => handleFieldChange(field.name, e.target.value)}
//               />
//             )}
//             {field.type === 'select' && (
//               <select
//                 value={initialStates[field.name][0]}
//                 onChange={(e) => handleFieldChange(field.name, e.target.value)}
//               >
//                 {field.options.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             )}
//           </label>
//         ))}
//       </div>
//       {handles.map((handle) => (
//         <Handle
//           key={handle.id}
//           type={handle.type}
//           position={handle.position}
//           id={handle.id}
//           style={handle.style}
//         />
//       ))}
//     </div>
//   );
// };


import { useState } from 'react';
import { Handle } from 'reactflow';

export const BaseNode = ({ id, data, type, handles, fields }) => {
   // 1. Initialize state for each field
  // We create an object called fieldStates to hold the value for each field
  const [fieldStates, setFieldStates] = useState(
    fields.reduce((initialState, field) => {
      initialState[field.name] = data[field.name] || field.defaultValue; // set default or existing value
      return initialState;
    }, {})
  );

  // 2. Function to update field value when user changes it
  const handleFieldChange = (fieldName, newValue) => {
    // Update the fieldStates with the new value for the given field
    setFieldStates((prevState) => ({
      ...prevState, // Keep the existing field values
      [fieldName]: newValue // Update the specific field
    }));
  };

  // Check the current state of fields (for debugging or learning purposes)
  console.log("Current field states:", fieldStates);


  return (
    <div style={{ width: 200, height:'auto', border: '1px solid black', borderRadius: '4px', backgroundColor:'#b5b1d3' }}>
      <div style={{backgroundColor:'#56537f80', padding: '6px'}}>
        <span>{type}</span>
      </div>
      <div style={{ backgroundColor: '#9c9cbf', padding: '6px', borderTopStyle: 'double', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px' }}>
        {fields.map((field) => (
          <label key={field.name} style={{ display: 'block', marginBottom: '5px' }}>
            {field.label}:
            {field.type === 'text' && (
              <input
                type="text"
                value={fieldStates[field.name]}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                style={{ borderRadius:'8px',border:'none', padding:'4px', marginTop:'4px'}}
              />
            )}
            {field.type === 'select' && (
              <select
                value={fieldStates[field.name]}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                style={{
                    marginLeft: '4px',
                    borderRadius: '8px',
                    border: 'none',
                    width: '150px',
                    backgroundColor: 'white',
                    padding: '4px',
                    marginTop: '4px'
                  }}
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </label>
        ))}
      </div>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}
    </div>
  );
};

