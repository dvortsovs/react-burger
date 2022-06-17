export default function socketMiddleware(wsUrl, wsActions) {
    return store => {
        let socket = null
        return next => action => {
            const {dispatch} = store;
            const {type, payload} = action;
            const {wsInit, wsSendMessage, wsClose, onOpen, onClose, onError, onMessage} = wsActions;

            if (type === wsInit) {
                const token = payload
                socket = new WebSocket(`${wsUrl}${token ? token : ''}`)
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({
                        type: onOpen,
                        payload: event
                    })
                }
                socket.onerror = event => {
                    dispatch({
                        type: onError,
                        payload: event
                    })
                }
                socket.onmessage = event => {
                    const {data} = event
                    const parsedData = JSON.parse(data)
                    dispatch({
                        type: onMessage,
                        payload: parsedData
                    })
                }
                socket.onclose = event => {
                    dispatch({
                        type: onClose,
                        payload: event
                    })
                }
                if (type === wsSendMessage) {
                    const message = {...payload}
                    socket.send(JSON.stringify(message))
                }
                if (type === wsClose) {
                    socket.close(1000, '')
                }
            }

            next(action);
        }
    }
}