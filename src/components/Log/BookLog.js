import React, { Component } from 'react';
import axios from 'axios';

import classes from './logs.module.css';

import stars  from './Stars';

const randomStar = (amount) => {
    let arrStars = [];
    for(let i = 0; i < amount; i++){
    const index = Math.floor(Math.random()*6);
    const star = <img src={stars[index]} alt='star' className={classes.SmallIcon}/>;
    
        arrStars.push(star);
    }

    return(<div>
        {arrStars}
        </div>
        )
}

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
                <input type="text" name="FavoritePart"
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
            <td>
                <button 
                onClick={props.setNewRecord}
               >
                    Add
                </button>
            </td>
         </tr>    
    //const reward = props.saved  randomStar(element.Reward)
    const items = info !== undefined ? info.map(element => {

        return(<tr key={element.Title}>
            <td>
                {element.Title}
            </td>
            <td>
                {element.FavoritePart}
            </td>            
            <td>
                {element.Date}
            </td>
            <td>
                {randomStar(element.Reward)}
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
             <th>My Favorite Part is:</th>
             <th>Date Finished</th>
             <th>Reward</th>
            </tr>
        </thead>
        <tbody>
             {inputs}
             {items}
        <tr><td colSpan='5'></td></tr>
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
        FavoritePart: '',
        booklog: [],
        totalStars: 0,
    }

    //fetch booklog documents from mongoDB
    getBooklog = () => { 
        console.log('Fetching booklog...');
        const url = this.state.baseUrl.concat('booklog');
        
        let len = 0;
        
        axios.get(url, this.state.headers)
        .then(response => {
            console.log(response.data);
            console.log('booklog retrieved!');  
            this.setState({booklog:response.data});
        response.data.forEach(book => {
            len += parseInt(book.Reward);
            console.log(book);
            console.log(book.Reward);
          })
          this.setState({totalStars: len});
          console.log('booklog.length: ', len); 
                     
          console.log('booklog saved to array!');
            return response.data;  
          })
          .catch(error=>console.log('error: ',error)); 


        // booklog.then(element => {
        //   //console.log(element);
        // });

        //this.props.saveBooklog(true, list);
      }

    setNewRecord = () => {
        const mp = 'My favorite part is ';
        const T = this.state.Title.toUpperCase();
        const D = this.state.Date;
        const R = this.state.Reward;
        const F = mp.concat(this.state.FavoritePart);

        const newRecord ={   
            Title: T,
            Date: D,
            Reward: R,
            FavoritePart: F
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

    setTotalStars = () => {
        let len = 0;
        this.state.booklog.forEach(book => {
            len += book.Reward;
        })
        this.setState({totalStars: len});
    }

    getTotalStars = (booklog) => {
        let len = 0;
        booklog.forEach(book => {
            len += parseInt(book.Reward);
            console.log(book);
            console.log(book.Reward);
        })
        this.setState({totalStars: len});
        console.log('booklog.length: ', len);
        return len;
    }

    changeHandler = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        let obj = {[name]: val};
        this.setState(obj);
        //console.log('obj: ', obj);
    }

    componentDidMount = () => {
        if(!this.props.savedBooklog)
        {
            this.getBooklog();
            //this.setStars();
        } else {
            this.setState({booklog: this.props.booklog})
        }
    }

    componentWillUnmount = () => {
        this.props.saveBooklog(true, this.state.booklog);   
        console.log('booklog: ', this.state.booklog);   
    }

    render() {
        return(<div className={classes.Booklog}>
            <h3 className={classes.OpaqueBox}> Total Stars (Book): {this.state.booklog.length === 0 ? null : this.state.totalStars} </h3>
            <DisplayBookLog 
            log={this.state.booklog}
            setNewRecord={this.setNewRecord}
            changeHandler={this.changeHandler}
            //saved={this.props.savedBooklog}
            />
        </div>)
    }
}

export default BookLog;