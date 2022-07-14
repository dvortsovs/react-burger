import loaderStyle from './loader.module.css'
import {FC} from "react";

interface ILoaderProps {
    stateDone: boolean;
}

const Loader: FC<ILoaderProps> = ({stateDone}) => {

    return (
        <div className={`${!stateDone ? loaderStyle.done : ''} ${loaderStyle.background}`}>
            <div className={loaderStyle.loader}></div>
        </div>
    )
}

export default Loader