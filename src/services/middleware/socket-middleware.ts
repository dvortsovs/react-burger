import {Middleware, MiddlewareAPI} from "redux";
import {TAppDispatch, TRootState, TWsActions} from "../reducers";

export default function socketMiddleware(wsUrl: string, wsActions: TWsActions): Middleware {
    return (store : MiddlewareAPI<TAppDispatch, TRootState>) => {
        let socket: WebSocket | null = null
        return (next) => action => {
            const {dispatch} = store;
            const {type, payload} = action;
            const {wsInit, wsClose, onOpen, onClose, onError, onMessage} = wsActions;

            if (type === wsInit) {
                const token = payload
                socket = new WebSocket(`${wsUrl}${token ? token : ''}`)
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch(onOpen(event))
                }
                socket.onerror = event => {
                    dispatch(onError(event))
                }
                socket.onmessage = event => {
                    const {data} = event
                    const parsedData = JSON.parse(data)
                    dispatch(onMessage(parsedData))
                }
                socket.onclose = event => {
                    dispatch(onClose(event))
                }
                if (type === wsClose) {
                    socket.close(1000, '')
                }
            }
            next(action);
        }
    }
}