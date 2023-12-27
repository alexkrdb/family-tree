import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContex";
import { useEdgesState } from "reactflow";
import { batch, readMany, reference } from "./useDB";

export const useRelations = () => {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { currentUser } = useContext(AuthContext);
  const ref = useRef();
  ref.current = edges;

  const fetchRelations = async () => {
    const data = await readMany([], "trees", currentUser.uid, "relations");
    data.map((el) => {
      el.type = "smoothstep";
      return el;
    });
    setEdges(data);
  };

  const saveRelations = () => {
    const relations = batch();
    ref.current.forEach((edge) => {
      if (edge.changed) {
        const dbref = reference("trees", currentUser.uid, "relations", edge.id);
        relations.set(dbref, {
          id: edge.id,
          source: edge.source,
          target: edge.target,
        });
      }
    });
    relations.commit();
  };

  useEffect(() => {
    if (currentUser) {
      fetchRelations();
      return saveRelations;
    }
  }, [currentUser]);

  return [edges, setEdges, onEdgesChange];
};
