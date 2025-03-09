export const generateId = () => {
  return crypto.randomUUID();
};

export function extractConnectionIds(edgeId: string) {
  const withoutPrefix = edgeId.replace(/^xy-edge__/, "");

  const [inputPart, rest] = withoutPrefix.split("node-source-");
  if (!rest) return null;
  const inputId = inputPart;

  const nodeTargetIndex = rest.indexOf("node-target-");
  if (nodeTargetIndex === -1) return null;

  const sourcePart = rest.substring(0, nodeTargetIndex);
  const inputIdIndex = sourcePart.indexOf(inputId);
  if (inputIdIndex === -1) return null;

  const afterInputId = sourcePart.substring(inputIdIndex + inputId.length);
  const trimmed = afterInputId.startsWith("-")
    ? afterInputId.substring(1)
    : afterInputId;

  const dashIndex = trimmed.indexOf("-");
  if (dashIndex === -1) return null;

  const outputId = trimmed.substring(dashIndex + 1);
  return { inputId, outputId };
}
