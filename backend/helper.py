from typing import Dict, List

def check_dag(graph: Dict[str, List[str]]) -> bool:
    """ Check if the directed graph is a Directed Acyclic Graph (DAG). """
    visited = set()
    rec_stack = set()

    def dfs(node: str) -> bool:
        if node in rec_stack:
            return False  # Cycle detected
        if node in visited:
            return True  # Already processed

        visited.add(node)
        rec_stack.add(node)

        for neighbor in graph.get(node, []):
            if not dfs(neighbor):
                return False  # Cycle detected in recursion

        rec_stack.remove(node)
        return True

    # Run DFS for each node to cover disconnected components
    for node in graph:
        if node not in visited:
            if not dfs(node):
                return False

    return True
