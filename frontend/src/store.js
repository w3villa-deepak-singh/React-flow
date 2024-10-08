import { create } from "zustand";

import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {}, 
    adjacencyList: {}, 

    getNodeID: (type) => {
        // console.log('Calling getNodeID with type:', type);
        
        const newIDs = { ...get().nodeIDs };
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({ nodeIDs: newIDs });

        const newID = `${type}-${newIDs[type]}`;
        // console.log('Generated new node ID:', newID);
        return newID;
    },
    addNode: (node) => {
        // console.log('Adding new node:', node);
        
        set({
            nodes: [...get().nodes, node]
        });
        
        // console.log('Updated nodes:', get().nodes);
    },
    onNodesChange: (changes) => {
        // console.log('Nodes changes:', changes);
        
        const updatedNodes = applyNodeChanges(changes, get().nodes);
        set({
            nodes: updatedNodes,
        });

        // console.log('Updated nodes:', updatedNodes);
    },
    onEdgesChange: (changes) => {
        // console.log('Edges changes:', changes);

        const updatedEdges = applyEdgeChanges(changes, get().edges);
        set({
            edges: updatedEdges,
        });

        // console.log('Updated edges:', updatedEdges);
    },
    onConnect: (connection) => {
        // console.log('New connection:', connection);

        const updatedEdges = addEdge(
            {
                ...connection,
                type: 'smoothstep',
                animated: true,
                style: { stroke: '#ff0072', strokeWidth: 2 },
                markerEnd: {
                    type: MarkerType.Arrow,
                    height: '20px',
                    width: '20px',
                    color: '#ff0072',
                },
            },
            get().edges
        );
        set({
            edges: updatedEdges,
        });
       

        //  Update the adjacency list
        const { source, target } = connection; // Extract source and target from the connection
        const currentAdjList = { ...get().adjacencyList }; // Get the current adjacency list

           // If the source node doesn't exist in the adjacency list, initialize it
        if (!currentAdjList[source]) {
            currentAdjList[source] = [];
        }
        
        // Add the target node to the source's list if it's not already present
        if (!currentAdjList[source].includes(target)) {
            currentAdjList[source].push(target);
        }

         // Update the adjacency list in the store
         set({
            adjacencyList: currentAdjList,
        });

        console.log('Updated adjacency list:', currentAdjList);

        // console.log('Updated edges with new connection:', updatedEdges);
    },

    updateNodeField: (nodeId, fieldName, fieldValue) => {
        // console.log('Updating node field:', { nodeId, fieldName, fieldValue });

        const updatedNodes = get().nodes.map((node) => {
            if (node.id === nodeId) {
                node.data = { ...node.data, [fieldName]: fieldValue };
            }

            return node;
        });
        set({
            nodes: updatedNodes,
        });

        console.log('Updated nodes:', updatedNodes);
    },
}));
