import { NavLink } from "react-router-dom";

function Hero() {
  return (
    <section class='w-screen h-screen flex items-center justify-center'>
      <div class='grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12'>
        <div class='mt-0 col-span-5 flex justify-center'></div>
        <div class='lg:mt-0 mt-10 lg:text-end text-center mr-auto place-self-center lg:col-span-7'>
          <h1 class='max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl text-white'>
            LLM Chat
          </h1>
          <p class='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl'>
            Bienvenido a la pagina web donde podrás interactuar con una IA que
            te ayudará y asisitirá{" "}
          </p>
          <NavLink
            to='demo'
            className='transition duration-200 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center border rounded-lg focus:ring-4 text-white border-gray-700 hover:bg-gray-700 focus:ring-gray-800'
          >
            Probar modelo
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default Hero;
