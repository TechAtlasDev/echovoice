import React from "react";

function Message({ audio, foto }) {
  return (
    <div className='message'>
      {audio && foto ? <h2>Datos recibidos</h2> : <h1>Esperando datos</h1>}
      {foto && (
        <img src={foto} alt='Captured' className='w-48 h-48 object-cover' />
      )}
      {audio && (
        <audio controls>
          <source src={audio} type='audio/wav' />
          Tu navegador no soporta el elemento de audio.
        </audio>
      )}
    </div>
  );
}

export default Message;
