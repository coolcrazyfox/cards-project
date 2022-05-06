import s from './Card.module.css'
import {FaStar} from 'react-icons/fa';

export default function StarRating({numTotalStars = 5, initialRating = 0}) {
    const numSelectedStars = initialRating

    const getColor = (i: any, numSelectedStars: number) => {
        return i < numSelectedStars ? 'rgba(190, 47, 65)' : ' #5b5858';
    }

    return (
        <div className={s.starRating}>
            <div>
                {Array.from({length: numTotalStars}).map((e, i) => (
                    <FaStar key={i}
                            className={s.starRatingStar}
                            color={getColor(i, numSelectedStars)}
                    />
                ))}
            </div>
        </div>
    );
}