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
    allow_origins=["http://localhost:3000"],  # Allow requests from this origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Define the PipelineData model
# class PipelineData(BaseModel):
#     adjacency_list: Dict[str, List[str]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post("/pipelines/parse")
def parse_pipeline(data: PipelineData):
    pipeline = data.adjacency_list
    
    # Step 1: Process the adjacency list
    all_nodes = set(pipeline.keys())  # Start with the sources (keys of the adjacency list)
    edges_count = 0

    for source, targets in pipeline.items():
        edges_count += len(targets)  # Count the number of edges (source -> targets)
        all_nodes.update(targets)    # Add all target nodes to the set

    # Step 2: Calculate number of nodes and edges
    nodes_count = len(all_nodes)

    # Step 3: Check if the graph is a DAG
    is_dag = check_dag(pipeline)

    return {
        "status": "parsed",
        "nodes_count": nodes_count,
        "edges_count": edges_count,
        "adjacency_list": pipeline,
        "is_dag": is_dag
    }



# @app.get('/pipelines/parse')
# def parse_pipeline(pipeline: str = Form(...)):
#     return {'status': 'parsed'}

