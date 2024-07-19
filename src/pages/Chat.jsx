import Message from "../components/Chat/Message";
import { Link } from "react-router-dom";

function Chat() {
  const listMessages = [
    { emisor: "system", text: "El chat comenzó" },
    { emisor: "user", text: "Hola, ¿cómo estás?" },
    {
      emisor: "ai",
      text: 'Como modelo de lenguaje, no tengo sentimientos ni emociones, así que no puedo decir que "estoy bien" o "estoy mal". Sin embargo, estoy aquí para ayudarte con cualquier pregunta o tarea que tengas. ¿Qué puedo hacer por ti hoy?',
    },
    { emisor: "user", text: "Hola, ¿cómo estás?" },
    {
      emisor: "ai",
      text: 'Como modelo de lenguaje, no tengo sentimientos ni emociones, así que no puedo decir que "estoy bien" o "estoy mal". Sin embargo, estoy aquí para ayudarte con cualquier pregunta o tarea que tengas. ¿Qué puedo hacer por ti hoy?',
    },
  ];

  return (
    <section className='bg-zinc-950 flex flex-col justify-start items-center p-5 min-h-screen'>
      <header className='mt-5 w-full'>
        <Link to='/'>
          <h1 className='absolute bg-red-500 p-2 rounded hover:bg-red-700'>
            Regresar
          </h1>
        </Link>
        <Link to='/'>
          <h1 className='text-white bg-gray-900 shadow-xl rounded-lg shadow-gray-700 p-5 w-full mb-10 lg:w-80 mx-auto font-bold tracking-tight text-5xl text-center transition duration-150 hover:shadow-none hover:bg-slate-400 hover:text-black'>
            Chat LLM
          </h1>
        </Link>
      </header>
      <div className='flex flex-col w-full mb-20 gap-4 lg:p-8'>
        {listMessages.map((message) => (
          <Message emisor={message.emisor} text={message.text} />
        ))}{" "}
      </div>
      <div className='fixed bottom-0 left-0 w-full bg-transparent p-4 shadow-md'>
        <input
          className='placeholder:italic placeholder:text-slate-400 block bg-gray-600 w-full border border-slate-500 rounded-2xl py-2 px-5 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-green-600 focus:ring-2 transition-all duration-200 sm:text-sm'
          placeholder='Escribe algo...'
          type='text'
          name='inputUser'
        />
      </div>
    </section>
  );
}

export default Chat;
