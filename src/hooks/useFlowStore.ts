import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from ".";
import * as FlowStore from "@/store/slices/flowSlice";
import type { Edge, Node } from "@xyflow/react";

export function useFlowStore(
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
) {
  const dispatch = useAppDispatch();
  const { nodes, edges, loaded } = useAppSelector((state) => state.flow);

  useEffect(() => {
    dispatch(FlowStore.loadFlow());
    if (loaded) {
      setNodes(nodes);
      setEdges(edges);
    }
  }, [dispatch, loaded]);

  function setEdgeStore(edges: Edge[]) {
    dispatch(FlowStore.setEdges(edges));
  }

  function setNodeStore(nodes: Node[]) {
    dispatch(FlowStore.setNodes(nodes));
  }

  return {
    setEdgeStore,
    setNodeStore,
  };
}
