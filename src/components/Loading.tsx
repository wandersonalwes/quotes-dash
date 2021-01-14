const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden bg-gradient-to-r from-indigo-50 to-indigo-100 p-10">
      <span className="relative">
        <span className="flex absolute h-10 w-10 top-0 right-0 -mt-1 -mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-10 w-10 bg-indigo-500"></span>
        </span>
      </span>
    </div>
  )
}

export default Loading
