
const footer = () => {
  return (
    
      <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-bold text-red-500 mb-3">MovieHub</h2>
          <p className="text-sm leading-6">
            Website មើលភ្លើងឆាកខ្មែរ & ខ្សែភាពយន្តបរទេស  
            មើលបានគ្រប់ប្រភេទ HD Full.
          </p>
        </div>

        {/* Menu */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Menu</h3>
          <ul className="space-y-2">
            <li className="hover:text-red-500 cursor-pointer">Home</li>
            <li className="hover:text-red-500 cursor-pointer">Movies</li>
            <li className="hover:text-red-500 cursor-pointer">Series</li>
            <li className="hover:text-red-500 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Category */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Category</h3>
          <ul className="space-y-2">
            <li className="hover:text-red-500 cursor-pointer">Khmer Movie</li>
            <li className="hover:text-red-500 cursor-pointer">China Movie</li>
            <li className="hover:text-red-500 cursor-pointer">Korea Movie</li>
            <li className="hover:text-red-500 cursor-pointer">Action Movie</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Follow Us</h3>
          <div className="flex gap-4">
            <a className="hover:text-red-500 cursor-pointer">Facebook</a>
            <a className="hover:text-red-500 cursor-pointer">YouTube</a>
            <a className="hover:text-red-500 cursor-pointer">Telegram</a>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-8 pt-5 text-center text-sm">
        © 2025 MovieKh. All Rights Reserved.
      </div>
    </footer>
    
  )
}

export default footer;