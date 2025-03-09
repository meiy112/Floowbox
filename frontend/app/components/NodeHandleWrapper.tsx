"use client";
import { Handle, Position, useStore, useConnection } from "@xyflow/react";
import React, { useState, useRef, useEffect } from "react";

type NodeHandleWrapperProps = {
  id: string;
  type: string;
  isConnectable: boolean;
  threshold?: number; // threshold (in pixels) for showing source handles when not connected
  children: React.ReactNode;
  isFrontend?: boolean;
};

const NodeHandleWrapper = ({
  id,
  type,
  isConnectable,
  threshold = 50,
  children,
}: NodeHandleWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSourceHandle, setSelectedSourceHandle] = useState<
    string | null
  >(null);
  const edges = useStore((state) => state.edges);
  const connection = useConnection();

  const directions: { [key: string]: Position } = {
    top: Position.Top,
    right: Position.Right,
    bottom: Position.Bottom,
    left: Position.Left,
  };

  const showTargetHandles =
    connection && connection.inProgress && connection.fromNode.id !== id;

  useEffect(() => {
    if (!showTargetHandles) {
      const handleGlobalMouseMove = (event: MouseEvent) => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const positions: { [key: string]: { x: number; y: number } } = {
            top: { x: centerX, y: rect.top },
            right: { x: rect.right, y: centerY },
            bottom: { x: centerX, y: rect.bottom },
            left: { x: rect.left, y: centerY },
          };

          const mouseX = event.clientX;
          const mouseY = event.clientY;
          let closestDirection: string | null = null;
          let minDistance = Infinity;

          Object.entries(positions).forEach(([dir, pos]) => {
            const dx = pos.x - mouseX;
            const dy = pos.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < minDistance) {
              minDistance = distance;
              closestDirection = dir;
            }
          });

          if (minDistance <= threshold) {
            setSelectedSourceHandle(closestDirection);
          } else {
            setSelectedSourceHandle(null);
          }
        }
      };

      window.addEventListener("mousemove", handleGlobalMouseMove);
      return () =>
        window.removeEventListener("mousemove", handleGlobalMouseMove);
    } else {
      setSelectedSourceHandle(null);
    }
  }, [threshold, showTargetHandles]);

  return (
    <div ref={containerRef} className="relative">
      {children}
      {Object.entries(directions).map(([dir, pos]) => {
        const sourceConnected = edges.some(
          (edge) =>
            edge.source === id &&
            edge.sourceHandle === `node-source-${dir}-${id}`
        );
        const targetConnected = edges.some(
          (edge) =>
            edge.target === id &&
            edge.targetHandle === `node-target-${dir}-${id}`
        );
        const isSourceActive =
          connection &&
          connection.inProgress &&
          connection.fromNode.id === id &&
          connection.fromHandle.id === `node-source-${dir}-${id}`;

        // Conditions for showing the target handle:
        // Always show it if a target connection exists, or if we're in target mode.
        const showTarget = targetConnected || showTargetHandles;
        // Conditions for showing the source handle:
        // Show it if there's an active source connection,
        // OR if it's the one closest to the mouse (provided no target connection occupies that side),
        // OR if the connection is actively in progress from this side.
        const showSource =
          sourceConnected ||
          isSourceActive ||
          (selectedSourceHandle === dir && !targetConnected);

        return (
          <React.Fragment key={dir}>
            {/* Target Handle */}
            <Handle
              type="target"
              position={pos}
              isConnectable={isConnectable}
              style={{
                background: "white",
                border: `1px solid var(--${type}__font)`,
                width: "0.9em",
                height: "0.9em",
                opacity: showTarget ? 1 : 0,
                pointerEvents: showTarget ? "auto" : "none",
                transition: "opacity 0.2s",
              }}
              id={`node-target-${dir}-${id}`}
            />
            {/* Source Handle */}
            <Handle
              type="source"
              position={pos}
              isConnectable={isConnectable}
              onClick={(event) => {
                event.stopPropagation();
                setSelectedSourceHandle(dir);
              }}
              style={{
                background: "white",
                border: `1px solid var(--${type}__font)`,
                width: "0.9em",
                height: "0.9em",
                opacity: showSource ? 1 : 0,
                pointerEvents: showSource ? "auto" : "none",
                transition: "opacity 0.2s",
              }}
              id={`node-source-${dir}-${id}`}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default NodeHandleWrapper;
