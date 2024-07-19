function ShadowContent({ children, ...props }) {
  return (
    <div
      {...props}
      className={`shadow-lg shadow-purple-500/20 w-96 ${props.ShadowclassName}`}
    >
      {children}
    </div>
  );
}

export default ShadowContent;
