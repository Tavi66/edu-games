import React, { Component } from 'react';
import axios from 'axios';

import classes from './Booklog.module.css';

const DisplayBookLog = (props) => {
    const info = props.log;

    const inputs = 
         <tr>
            <td>
                <input type="text" name="Title"
                onChange = {props.changeHandler}
                />
            </td>
            <td>
                <input type="date" name="Date"
                onChange = {props.changeHandler}
                />
            </td>
            <td>
                <input type="number" name="Reward"
                onChange = {props.changeHandler}
                />
            </td>
            {/* <td>
                <input type="number" name="Labor"
                onChange = {props.changeHandler}
                />
            </td>        */}
            <td>
                <button 
                //onClick={() => window.alert('backend off at the moment...')}
                onClick={props.setNewRecord}
               >
                    Add
                </button>
            </td>
         </tr>

    const items = info !== undefined ? info.map(element => {

        return(<tr key={element.Title}>
            <td>
                {element.Title}
            </td>
            <td>
                {element.Date}
            </td>
            <td>
                {element.Reward}
            </td>        
            </tr>
        )
    }) : null;
    
    const calculations = <tr>
        <td>Total</td>
    </tr>

    return(<div>
    <table className={classes.Table}>
        <thead>
            <tr className={classes.Row}>
             <th>Title</th>
             <th>Date Finished</th>
             <th>Reward</th>
            </tr>
        </thead>
        <tbody>
             {inputs}
             {items}
        <tr><td colSpan='4'></td></tr>
        </tbody>
        <tfoot>
             {calculations}
        </tfoot>
    </table>
    </div>
    )
}

class BookLog extends Component {
    state = {
        baseUrl: `/api/`,
        headers: {
            "Content-Type": "application/json"
          },
        Title: '',
        Date: '',
        Reward: 0,
        booklog: [],

    }
    //fetch booklog documents from mongoDB
    getBooklog = () => { 
        console.log('Fetching booklog...');
        const url = this.state.baseUrl.concat('booklog');
        const booklog = axios.get(url, this.state.headers)
        .then(response => {
            console.log(response.data);
            console.log('booklog retrieved!');  
            return response.data;  
          })
          .catch(error=>console.log('error: ',error)); 
    
        booklog.then(element => {
          //console.log(element);
          this.setState({booklog:element});
          console.log('booklog saved to array!');
        });
      }

    setNewRecord = () => {
        const T = this.state.Title.toUpperCase();
        const D = this.state.Date;
        const R = this.state.Reward;

        const newRecord ={   
            Title: T,
            Date: D,
            Reward: R
        }

        const url = this.state.baseUrl.concat('booklog/add'); 
        //add new record into database
        axios.post(url, newRecord)
        .then(response => {
            console.log(response.data);
            console.log('Added new record!');  
            return response.data;  
          })
          .catch(error=>console.log('error: ',error)); 


          const nBooklog = [...this.state.booklog, newRecord];
          this.setState({booklog: nBooklog});
          console.log('nBooklog: ', nBooklog);
          console.log('newRecord: ', newRecord);
    }    

    changeHandler = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        let obj = {[name]: val};
        this.setState(obj);
        //console.log('obj: ', obj);
    }

    componentDidMount = () => {
        this.getBooklog();
    }

    render() {
        return(<div className={classes.Booklog}>
            <DisplayBookLog 
            log={this.state.booklog}
            setNewRecord={this.setNewRecord}
            changeHandler={this.changeHandler}
            />
        </div>)
    }
}

export default BookLog;