import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Box, Typography, Paper } from "@mui/material";
import axiosInstance from "../utils/api";

const initialColumns = {
  assigned: { id: "assigned", title: "To Do", tasks: [] },
  in_progress: { id: "in_progress", title: "In Progress", tasks: [] },
  completed: { id: "completed", title: "Done", tasks: [] },
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/api/assignments/my-project");
        if (res.data && res.data.project) {
          const status = res.data.status || "assigned";
          const newCols = { ...initialColumns };
          newCols[status].tasks = [{
            id: res.data.project.id.toString(),
            content: res.data.project.title,
            feedback: res.data.feedback
          }];
          setColumns(newCols);
        }
      } catch (err) {
        // mock fallback if failure
        const mCols = { ...initialColumns };
        mCols.assigned.tasks = [{ id: "1", content: "Build Dashboard", feedback: "" }];
        setColumns(mCols);
      }
    })();
  }, []);

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceCol = columns[source.droppableId];
      const destCol = columns[destination.droppableId];
      const sourceTasks = [...sourceCol.tasks];
      const destTasks = [...destCol.tasks];
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, tasks: sourceTasks },
        [destination.droppableId]: { ...destCol, tasks: destTasks },
      });

      try {
        await axiosInstance.patch("/api/assignments/update-status", {
          status: destination.droppableId
        });
      } catch (err) {
        console.error("Failed to update status", err);
      }
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 3, overflowX: "auto", pb: 2, height: '100%', mt: 2 }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(columns).map(([id, col]) => (
          <Box key={id} sx={{ flex: 1, minWidth: 250 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>{col.title}</Typography>
            <Droppable droppableId={id}>
              {(provided, snapshot) => (
                <Paper
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{
                    p: 2,
                    minHeight: 400,
                    background: snapshot.isDraggingOver ? "rgba(90, 69, 255, 0.1)" : "rgba(255,255,255,0.4)",
                    borderRadius: 3,
                    border: "1px dashed rgba(0,0,0,0.1)",
                    transition: '0.2s ease'
                  }}
                >
                  {col.tasks.map((t, index) => (
                    <Draggable key={t.id} draggableId={t.id} index={index}>
                      {(provided, snapshot) => (
                        <Paper
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          elevation={snapshot.isDragging ? 5 : 1}
                          sx={{
                            p: 2, mb: 2, borderRadius: 2,
                            background: "#fff",
                            ...provided.draggableProps.style
                          }}
                        >
                          <Typography sx={{ fontWeight: 600 }}>{t.content}</Typography>
                          {t.feedback && <Typography variant="caption" color="error.main" sx={{display: 'block', mt:1}}>Admin Feedback: {t.feedback}</Typography>}
                        </Paper>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Paper>
              )}
            </Droppable>
          </Box>
        ))}
      </DragDropContext>
    </Box>
  );
}
