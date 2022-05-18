import ReactDOM from 'react-dom'
import { Component } from 'react'
import { w3cwebsocket as W3CWebSocket} from "websocket"

const client = new W3CWebSocket('ws://127.0.0.1:8000');

export default class App extends Component {
    componentDidMount() {
        client.onopen = () => {
            console.log("Websocket client connected.")
        }
    }
    render() {
        return (
            <div>
               <button onClick={()=> this.onButtonClicked("Hello")}>Send message</button>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));