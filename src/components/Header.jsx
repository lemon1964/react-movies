
import { Link, useHistory } from 'react-router-dom';

function Header() {
    const history = useHistory();

    const handleHomeClick = () => {
        history.push('/');
        window.location.reload(); // Перезагрузка страницы для сброса состояния
    };

    return (
        <nav className='green darken-1'>
            <div className='nav-wrapper'>
                <span onClick={handleHomeClick} className='brand-logo' style={{cursor: 'pointer'}}>
                    Movies
                </span>
                {/* <ul id='nav-mobile' className='right hide-on-med-and-down'>
                    <li>
                        <Link to={`/about`}>About</Link>
                    </li>
                    <li>
                        <Link to={`/contacts`}>Contacts</Link>
                    </li>               
                </ul> */}
            </div>
        </nav>
    );
}

export { Header };
