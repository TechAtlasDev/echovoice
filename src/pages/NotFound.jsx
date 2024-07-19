import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section>
      <h1>¿Te has perdido?</h1>
      <Link to='/' className='bg-red-500'>
        Regresar
      </Link>
    </section>
  );
}

export default NotFound;
