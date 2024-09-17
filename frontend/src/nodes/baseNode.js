

import { useState } from 'react';
import { Handle } from 'reactflow';

export const BaseNode = ({ id, data, type, handles, fields,onFieldChange}) => {

  // this object called fieldStates used to hold the value for each field
  const [fieldStates, setFieldStates] = useState(
    fields.reduce((initialState, field) => {
      initialState[field.name] = data[field.name] || field.defaultValue; 
      return initialState;
    }, {})
  );

  //  to update field value when user changes it
  const handleFieldChange = (fieldName, newValue) => {

    setFieldStates((prevState) => ({
      ...prevState, 
      [fieldName]: newValue 
    }));

      // Trigger parent component's onFieldChange function
   if (onFieldChange) {
    onFieldChange(fieldName, newValue);
  }
    
  
  };
   


  // console.log("Current field states:", fieldStates);


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



