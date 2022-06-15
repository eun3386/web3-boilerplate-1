import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Layout: FC = ({ children }) => {
    return <div>
        <div>
            <div>
                <p>eunji-Animals</p>
            </div>
            <Link to="/">
                <button>Main</button>
            </Link>
            <Link to="/my-animal">
                <button>My Animal</button>
            </Link>
            <Link to="/sale-animal">
                <button>Sale Animal</button>
            </Link>
        </div>
        <div>{children}</div>
    </div>
}

export default Layout;