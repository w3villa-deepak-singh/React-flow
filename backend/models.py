from pydantic import BaseModel
from typing import List, Dict

class PipelineData(BaseModel):
    adjacency_list: Dict[str, List[str]]