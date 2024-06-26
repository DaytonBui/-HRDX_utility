import { useCallback } from "react";
import { addEdge, useEdgesState, useNodesState } from "reactflow";

const useFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: any) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const generateNewNode = (type: string) => {
    setNodes((prev) => [
      ...prev,
      {
        id: "" + Date.now() + Math.random(),
        position: {
          x: (prev[prev.length - 1]?.position?.x + 20) | 200,
          y: (prev[prev.length - 1]?.position?.y + 20) | 200,
        },
        data: { label: "" + Date.now() + Math.random(), fields: [] },
        type: type,
      },
    ]);
  };
  const clearNode = () => {
    setNodes([]);
  };
  const updateNodeData = (id: string, data: any) => {
    setNodes((node: any) => {
      return node.map((item: any) => {
        if (item.id === id) {
          // Return a new object with the updated name
          return { ...item, data: data };
        }
        return item; // Return the unchanged item
      });
    });
  };
  return {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    onConnect,
    generateNewNode,
    clearNode,
    updateNodeData,
  };
};
export default useFlow;
