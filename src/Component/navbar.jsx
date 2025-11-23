import "../style/navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">Weflix</div>

            <ul className="menu">
                <li><a href="#">Home</a></li>
                <li><a href="#">New</a></li>
                <li><a href="#">Popular</a></li>
                <li><a href="#">Simulcast</a></li>
                <li><a href="#">Categories</a></li>
            </ul>

            <ul className="right">
                <li>
                    <div className="search">
                        <input
                            className="search_input"
                            type="text"
                            placeholder="Search here..."
                        />
                        <a href="#" className="search_icon">
                            <i className="fa fa-search"></i>
                        </a>
                    </div>
                </li>

                <li><i className="fa-brands fa-facebook"></i></li>
                <li><i className="fa-brands fa-discord"></i></li>
                <li><i className="fa-solid fa-circle-user"></i></li>

                <li className="premium">
                    <i className="fa-solid fa-crown"></i> Premium
                </li>
            </ul>
        </nav>
    );
}
