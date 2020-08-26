import React, {Component} from 'react';
//import axios from 'axios';


class ToDoList extends Component {
    state = {
        notes: [
            {name: 'Mini Apple Pies', date: '38 min'}
        ]        
    }
    render(){
        return(<div>
            from ToDoList class
        </div>);
    }
}

export default ToDoList;