import loaderStyle from './loader.module.css'

export default function Loader({stateDone}) {

    return (
        <div className={`${!stateDone ? loaderStyle.done : ''} ${loaderStyle.background}`}>
            <div className={loaderStyle.loader}></div>
        </div>
    )
}