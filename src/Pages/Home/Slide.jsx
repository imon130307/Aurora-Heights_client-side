

// eslint-disable-next-line react/prop-types
const Slide = ({ image, text,description }) => {
  return (
    <div
      className='w-full bg-center bg-cover h-[30rem]'
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className='flex items-center justify-center w-full h-full bg-gray-900/70'>
        <div className='text-center'>
          <h1 className='text-3xl font-semibold text-white lg:text-4xl'>
            {text}
          </h1>
          <p className="mt-2">{description}</p>
          <label className="input input-bordered flex items-center gap-2 mt-6 w-96 mx-auto">
            <input type="text" className="grow" placeholder="Search" />
            <span className="btn text-2xl">Search</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Slide
