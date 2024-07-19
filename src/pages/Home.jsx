import Hero from "../components/Hero";
import Shadow from "../components/Shadow";

function Home() {
  return (
    <section className='max-h-screen overflow-hidden'>
      <Hero />
      <Shadow wrapperClassName='mx-auto w-[90%] h-[24rem] top-82 inset-0' />
    </section>
  );
}

export default Home;
