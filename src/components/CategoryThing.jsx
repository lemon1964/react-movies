import { useHistory } from 'react-router-dom';

function CategoryThing({ id, name, image, description }) {
    const { push } = useHistory();

    const handleCategoryClick = () => {
        push(`/?search=${encodeURIComponent(name)}&type=all`);
    };

    return (
        <div className='card'>
            <div className='card-image'>
                <img src={image} alt={name} />
            </div>
            <div className='card-content'>
                <span className='card-title'>{name}</span>
                <p>{description}...</p>
            </div>
            <div className='card-action'>
                <button className='btn' onClick={handleCategoryClick}>
                    Watch category
                </button>
            </div>
        </div>
    );
}

export { CategoryThing };
