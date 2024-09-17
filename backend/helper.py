from typing import Dict, List

def check_dag(graph: Dict[str, List[str]]) -> bool:
  
    visited = set()
    rec_stack = set()

    def dfs(node: str) -> bool:
        if node in rec_stack:
            return False  
        if node in visited:
            return True  

        visited.add(node)
        rec_stack.add(node)

        for neighbor in graph.get(node, []):
            if not dfs(neighbor):
                return False  

        rec_stack.remove(node)
        return True

    #  for disconnected components
    for node in graph:
        if node not in visited:
            if not dfs(node):
                return False

    return True
