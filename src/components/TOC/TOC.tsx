export function TOC({ data }: { data: Array<any> }) {
  const renderNodes = (nodes: Array<any>) => {
    return (
      <ul className="list-none space-y-0.5">
        {nodes.map((node) => (
          <li key={node.data.hProperties.id}>
            <a
              href={`#${node.data.hProperties.id}`}
              className="block py-1.5 px-3 ms-1 text-muted-foreground hover:text-foreground rounded-xl transition-all duration-200 text-sm hover:bg-primary/5 border-l-2 border-transparent hover:border-primary"
            >
              {node.value}
            </a>
            {node.children?.length > 0 && (
              <div className="ms-3">{renderNodes(node.children)}</div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  if (!data?.length) {
    return null;
  }

  return (
    <div>
      <span className="block text-xs font-display font-bold tracking-wider uppercase mb-4 gradient-text">
        On this page
      </span>
      {renderNodes(data)}
    </div>
  );
}
