export function TOC({ data }: { data: Array<any> }) {
  const renderNodes = (nodes: Array<any>) => {
    return (
      <ul className="list-none">
        {nodes.map((node) => (
          <li key={node.data.hProperties.id} className="ms-2 mb-2 last:mb-0">
            <a href={`#${node.data.hProperties.id}`}>{node.value}</a>
            {node.children?.length > 0 && renderNodes(node.children)}
          </li>
        ))}
      </ul>
    );
  };

  if (!data?.length) {
    return null;
  }

  return (
    <div className="text-sm text-gray-500 dark:text-gray-400">
      <span className="block uppercase mb-5">Table of contents</span>
      {renderNodes(data)}
    </div>
  );
}
