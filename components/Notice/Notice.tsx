export default function Notice() {
  return (
    <div className="flex text-white text-center md:text-left">
      <div className="mr-4 flex-shrink-0 self-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          className="h-20 w-auto"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7.159 3.185C7.415 3.066 7.699 3 8 3h8a2 2 0 0 1 2 2v9m0 4v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6m5-2h2M3 3l18 18m-9-4v.01"
          />
        </svg>
      </div>
      <div>
        <p className="italic text-xl md:text-2xl md:max-w-lg hidden md:block">
          Please ensure your mobile phone is silent in the prayer hall.
        </p>
      </div>
    </div>
  )
}
