from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from models import PipelineData
from helper import check_dag

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)



@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post("/pipelines/parse")
def parse_pipeline(data: PipelineData):
    pipeline = data.adjacency_list
    
    print(" pipeline (adjacencylist) in the graph:", pipeline)

    # now process the adjacency list
    all_nodes = set(pipeline.keys())  
    edges_count = 0

    for source, targets in pipeline.items():
        edges_count += len(targets) 
        all_nodes.update(targets)   

    print("All nodes in the graph:", all_nodes)

   
    nodes_count = len(all_nodes)

    #   for the graph is a DAG or not
    is_dag = check_dag(pipeline)

    return {
        "status": "parsed",
        "nodes_count": nodes_count,
        "edges_count": edges_count,
        "adjacency_list": pipeline,
        "is_dag": is_dag
    }



