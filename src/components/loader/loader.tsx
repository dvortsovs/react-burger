import loaderStyle from './loader.module.css'
import {FC} from "react";

type TLoaderProps = {
    stateDone: boolean;
}

const Loader: FC<TLoaderProps> = ({stateDone}) => {

    return (
        <div className={`${!stateDone ? loaderStyle.done : ''} ${loaderStyle.background}`}>
            <div className={loaderStyle.loader}></div>
        </div>
    )
}

export default Loader