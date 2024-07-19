function Message(props) {
  const emisor = props.emisor;
  const texto = props.text;

  let styles;

  if (emisor === "ai") {
    styles =
      "bg-green-600/30 border border-green-600 shadow-lg shadow-green-600/70 w-64 text-base p-4 rounded-xl";
  } else if (emisor === "user") {
    styles =
      "bg-primary/30 border border-primary shadow-lg shadow-primary/70 ml-auto w-64 text-base p-4 rounded-xl";
  } else {
    styles =
      "mx-auto bg-black/60 border border-white/30 shadow-lg shadow-white/20 rounded-xl px-7 py-1 border-black text-sm text-center";
  }

  return <div className={`w-96 ${styles}`}>{texto}</div>;
}

export default Message;
