const Shadow = ({ children, ...props }) => (
  <div {...props} className={`relative ${props.wrapperClassName || ""}`}>
    <div
      className={`absolute bluring mx-auto blur-[100px] ${
        props.wrapperClassName || ""
      }`}
    ></div>
    <div className='relative'>{children}</div>
  </div>
);

export default Shadow;
