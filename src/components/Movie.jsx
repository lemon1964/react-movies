import React from 'react';

function Movie(props) {
    const title = props.Title || props.title;
    const year = props.Year || props.year;
    const id = props.imdbID || props.id;
    const type = props.Type || props.type;
    const poster = props.Poster || props.poster;
    const imdb_id = props.imdbID || props.imdb_id || props.id; // fallback на id, если imdb_id нет

    return (
        <div id={id} className='card movie'>
            <div className='card-image waves-effect waves-block waves-light'>
                {poster === 'N/A' || !poster ? (
                    <img
                        className='activator'
                        src={`https://via.placeholder.com/300x400?text=${encodeURIComponent(title)}`}
                        alt={title}
                    />
                ) : (
                    <img className='activator' src={poster} alt={title} />
                )}
            </div>
            <div className='card-content'>
                <span className='card-title activator grey-text text-darken-4'>
                    {title}
                </span>
                <p>
                    {year && <>{year}</>} {type && <span className='right'>{type}</span>}
                </p>
            </div>
            {imdb_id && (
                <div className='card-action'>
                    <a
                        href={`https://www.imdb.com/title/${imdb_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Watch movie
                    </a>
                </div>
            )}
        </div>
    );
}

export { Movie };
