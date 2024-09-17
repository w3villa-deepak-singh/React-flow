// submit.js


import { useStore } from './store'; 
import { useState } from 'react';


export const SubmitButton = () => {
    const adjacencyList = useStore((state) => state.adjacencyList);
    const [isSubmitting, setIsSubmitting] = useState(false); 
    

    const handleSubmit = async () => {
        setIsSubmitting(true);
        
        try {
          console.log("adjacencylistttt", adjacencyList);


          const response = await fetch(`${process.env.BACKEND_URL}/pipelines/parse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ adjacency_list: adjacencyList }), 
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Submission successful:', result);

              // Extract the number of nodes and edges from the response
              const { nodes_count, edges_count , is_dag} = result;

            alert(`{num_nodes: ${nodes_count}, num_edges: ${edges_count} ,is_dag: ${is_dag} }`);

          

        } else {
            console.error('Submission failed:', response.statusText);
            alert('Submission failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during submission:', error);
        alert('An error occurred during submission. Please try again.');
    } finally {
        setIsSubmitting(false);
    }


    };

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button 
            type="submit"
            style={{
                width: '120px',
                height: '47px',
                fontSize: '22px',
                padding: '6px',
                borderRadius: '6px',
                backgroundColor: 'rgb(28, 37, 54)',
                color: 'white'
            }}
            disabled={isSubmitting} 
            onClick={handleSubmit}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}

                </button>
        </div>
    );
}
