import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Edge, Node } from "@xyflow/react";

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  loaded: boolean;
}

const STORAGE_KEY = "reactFlowData";

// Не хочу indexdb заводить -- обусловимся, что 5Мб нам хватит
const loadFromLocalStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { nodes: [], edges: [] };
  } catch (e) {
    console.warn("Ошибка загрузки данных из localStorage:", e);
    return { nodes: [], edges: [] };
  }
};

const saveToLocalStorage = (state: FlowState) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        nodes: state.nodes,
        edges: state.edges,
      })
    );
  } catch (e) {
    console.warn("Ошибка сохранения в localStorage:", e);
  }
};

const initialState: FlowState = {
  nodes: [],
  edges: [],
  loaded: false,
};

const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setNodes(state, action: PayloadAction<Node[]>) {
      state.nodes = action.payload;
      saveToLocalStorage(state);
    },
    setEdges(state, action: PayloadAction<Edge[]>) {
      state.edges = action.payload;
      saveToLocalStorage(state);
    },
    loadFlow(state) {
      const { nodes, edges } = loadFromLocalStorage();
      state.nodes = nodes;
      state.edges = edges;
      state.loaded = true;
    },
  },
});

export const { setNodes, setEdges, loadFlow } = flowSlice.actions;
export const flowReducer = flowSlice.reducer;
