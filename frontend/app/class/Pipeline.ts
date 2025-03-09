export class Pipeline {
  id: string;
  nodes: { [key: string]: PipelineNode };
  edges: PipelineEdge[];

  constructor(id: string) {
    this.id = id;
    this.nodes = {};
    this.edges = [];
  }

  addNode(node: PipelineNode): void {
    this.nodes[node.id] = node;
  }

  addEdge(edge: PipelineEdge): void {
    this.edges.push(edge);
  }

  removeEdge(edgeId: string): void {
    this.edges = this.edges.filter((edge) => edge.id !== edgeId);
  }

  /**
   * Executes the pipeline.
   * If `startingNodeIds` is provided, only those nodes will be executed as starting points.
   * Otherwise, it falls back to all nodes with no incoming edges.
   */
  async execute(input?: any, startingNodeIds?: string[]): Promise<void> {
    let startNodes: PipelineNode[];
    if (startingNodeIds && startingNodeIds.length > 0) {
      startNodes = startingNodeIds
        .map((id) => this.nodes[id])
        .filter((node) => node !== undefined);
    } else {
      startNodes = this.getStartNodes();
    }
    for (const node of startNodes) {
      await this.executeNode(node, input);
    }
  }

  async executeNode(
    node: PipelineNode,
    input?: any,
    visited: Set<string> = new Set()
  ): Promise<void> {
    const output = await node.process(input);

    if (visited.has(node.id)) {
      console.warn(`Cycle detected: Node ${node.id} already executed.`);
      return output;
    }

    const outgoingEdges = this.edges.filter(
      (edge) => edge.from.nodeId === node.id
    );

    visited.add(node.id);

    for (const edge of outgoingEdges) {
      const nextNode = this.nodes[edge.to.nodeId];
      if (nextNode) {
        await this.executeNode(nextNode, output, new Set(visited));
      }
    }
  }

  /**
   * Returns all nodes that do not have any incoming edges.
   */
  getStartNodes(): PipelineNode[] {
    const nodesWithIncoming = new Set(this.edges.map((edge) => edge.to.nodeId));
    return Object.values(this.nodes).filter(
      (node) => !nodesWithIncoming.has(node.id)
    );
  }
}

export interface PipelineNode {
  id: string;
  type: string;
  process: (input: any) => Promise<any> | any;
}

export interface PipelineEdge {
  id: string;
  from: {
    nodeId: string;
    port?: string;
  };
  to: {
    nodeId: string;
    port?: string;
  };
}
