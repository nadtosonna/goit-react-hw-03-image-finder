import { ThreeCircles } from 'react-loader-spinner';
import css from './Loader.module.css';

export function Loader() {
    return (
        <div className={css.backdrop}>
            <ThreeCircles
            height="100"
            width="100"
            color="#3f51b5"
            wrapperStyle={{}}
            wrapperClass="backdrop"
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
        />
        </div>

    )
}
