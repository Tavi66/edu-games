import React, { Component } from 'react';
import axios from 'axios';

import classes from './logs.module.css';

import stars  from './Stars';

const ViewWeeks = (props) => {
    return(<div className={classes.ViewWeeks}>
            <button onClick={props.lastWeekClickHandler}>
              Last week                
            </button>
            <button onClick={props.thisWeekClickHandler}>
              Today                
            </button>        
    </div>)
}

const randomStar = (amount) => {
    let arrStars = [];
    for(let i = 0; i < amount; i++){
    const index = Math.floor(Math.random()*6);
    //console.log('val: ', index);
    const star = <img src={stars[index]} alt='star' className={classes.SmallIcon}/>;
    
        arrStars.push(star);
    }

    return(<div>
        {arrStars}
        </div>
        )
}

const getLastWeek = () => {
    let D = new Date();
    let day = D.getDay();
    let date =  D.getDate(); 
    console.log('Day: ', day , ' Date: ', date);    
    
    let day0 = new Date();
    day0.setDate(date-day-7);
    let selectedDate = day0.getDate();
    let week = [];
    week.push('00/00');
    let day1 = day0.getMonth() + '/' + day0.getDate();
    console.log('day1 (lastwk): ', day1);
    week.push(day1);

    for(let i = 1; i < 7; i++){
        let temp = day0;
        selectedDate += 1;
         temp.setDate(selectedDate);
        let tempDate = temp.getMonth() + '/' + temp.getDate();
        console.log('tempdate (lastwk): ', tempDate);

         week.push(tempDate);
    }
    console.log(week);
     return week;
}

const DisplayWeek = (props) => {
    //if(!props.savedChorelog){props.setStarGrid()}

    let items = [];
    let grid = props.grid;
    //console.log('grid: ',grid);
    const week = props.week;
    const chores = props.chores;
    
    for(let i = 0; i < 6; i++){
    let tr = [];
        for(let j = 0; j < 8; j++){
            const day = j === 0 ? -1 : week[j];
            const chore = chores[i];
            let item;

            if(grid.length === 0)
            {item = j === 0 ? chore: null;}
             else 
            {
                if(grid[i][j] !== undefined)
                item = j === 0 ? chore: grid[i][j]; 
            }        
        let td = 
          <td onClick={()  => props.rewardClickHandler(day,chore)}>
           {item} 
           {/* [{i}][{j}] */}
          </td>; 
          tr.push(td);        
        }

        let row = <tr>{tr}</tr>;  
        //console.log(row);
        items.push(row);
    }

    //items = items.map(element => <tr className={classes.Row}>{element}</tr>);

    const weekHeaders = week.length === 0 ? 
     <tr className={classes.Row}>
    <th>Chore</th>
    <th>Sun</th>
    <th>M</th>
    <th>T</th>
    <th>W</th>
    <th>TH</th>
    <th>F</th>
    <th>Sat</th>
   </tr> :
    <tr className={classes.Row}>
        <th>Chore</th>
        <th>Sun <br/> {week[1]} </th>
        <th>M <br/> {week[2]} </th>
        <th>T <br/> {week[3]} </th>
        <th>W  <br/> {week[4]} </th>
        <th>TH  <br/> {week[5]} </th>
        <th>F  <br/> {week[6]} </th>
        <th>Sat  <br/> {week[7]} </th>
    </tr>
    return(<div>
      {/* Today: {day} {date} */}
      <table className={classes.Table}>
      <thead>
          {weekHeaders}
        </thead>
        <tbody>
            {items}
        </tbody>
      </table>
    </div>)
}

class ChoreLog extends Component {
    state = {
        baseUrl: `/api/`,
        headers: {
            "Content-Type": "application/json"
          },
        today: '',
        chorelog: [],
        week: [],
        chores: [],
        grid: [],
        starsAt: [],
        deleteId: '',
        totalStars: 0,
    }

    lastWeekClickHandler = () => {
        this.setLastWeek();
    }

    thisWeekClickHandler = () => {
        this.setThisWeek();
    }

    getThisWeek = () => {
        let D = new Date();
        let day = D.getDay();
        let date =  D.getDate(); 
        console.log('Day: ', day , ' Date: ', date);    
        
        let day1 = new Date();
        day1.setDate(date-day);
        let selectedDate = day1.getDate();
        let week = [];
        week.push('00/00');
        day1 = day1.getMonth() + '/' + day1.getDate();
        week.push(day1);
    
        for(let i = 1; i < 7; i++){
            let temp = new Date();
            selectedDate += 1;
             temp.setDate(selectedDate);
            let tempDate = temp.getMonth() + '/' + temp.getDate();
             week.push(tempDate);
        }
         return week;
    }

    setThisWeek = () => {
        //this.setState({grid: []});
        let week = this.getThisWeek();
        //this.setGrid();
        //console.log('week: ', week);
        console.log('week: ', week);
        this.setState({week:week}, () => this.setStarGrid());
    }

    setLastWeek = () => {
        //this.setState({grid: []});
        let week = getLastWeek();
        //this.setGrid();
        //console.log('week: ', week);
        console.log('week: ', week);
        this.setState({week:week}, () => this.setStarGrid());
        //this.setStarGrid()
    }
    
    rewardClickHandler = (day, chore) => {

        if(day === -1)
        {
            //Do not add star entry
            console.log('Header clicked.');
            console.log('chorelog: ', this.state.chorelog);
            console.log('stars: ', this.state.starsAt);
            console.log('grid: ', this.state.grid);
            this.setStarGrid();
       } 
        else {
            //this.setGrid();
        console.log('day of the week: ',day, 'chore: ',chore);
        this.setNewRecord(day, chore);
       }
    }

    setNewRecord = (day,chore) => {
        const C = chore;
        const D = day;
        const R = 1;

        const newRecord ={   
            Chore: C,
            Date: D,
            Reward: R
        }

        const rewardExists = this.rewardExists(newRecord);

        if(rewardExists)
        {
            window.alert('Need to remove star. Not working rn. ._.');
            // console.log('Reward exists in db. Removing reward...');
            // this.getStars();
            // this.setStarGrid();  
        } else {
        console.log(newRecord);
        const url = this.state.baseUrl.concat('chorelog/add'); 
        //add new record into database
        axios.post(url, newRecord)
        .then(response => {
            console.log(response.data);
            console.log('Added new record!'); 
            //this.setStarGrid(); 
            return response.data;  
          })
          .catch(error=>console.log('error: ',error));  
        }
          this.getStars();
          //this.props.saveChorelog(true, this.state.chorelog);
          //this.setStarGrid();

    }

    rewardExists = (record) => {
        //const url = this.state.baseUrl.concat('chorelog/find');
        //let list;
        let rewardExists;
        let chorelog = [...this.state.chorelog];

        // axios.get(url, this.state.headers)
        // .then(response => {
        //     console.log(response.data);
        //     console.log('chorelog retrieved!'); 
        //     chorelog = response.data;
        //     return response.data;
        //   })
        //   .catch(error=>console.log('error: ',error)); 


        let id = chorelog.findIndex(element => {
            console.log('element: ', element, '\nrecord: ',record);
            return element.Chore === record.Chore && element.Date === record.Date;
        })

        if(id === -1){
           rewardExists = false;
        } else {
            rewardExists = true;
            // const item = chorelog[id];
            // console.log('item: ', item);
            // console.log('id: ', id);
            // window.confirm('delete record.');
            // this.removeStar(item);
            // console.log('Reward removed!');
            // console.log('deleteId: ', id);
            // this.setState({deleteId: id});
        }
        // axios.get(url, record)
        // .then(response => {
        //     console.log(response.data);
        //     console.log('chorelog retrieved!');  
        //     rewardExists = response.data;
        //     return response.data;
        //   })
        //   .catch(error=>console.log('error: ',error)); 
            
          console.log('rewardExists: ',rewardExists);
          return rewardExists;
    }


    removeStar = (record) => {
        const url = this.state.baseUrl.concat('chorelog/delete');

        console.log('record to delete: ',record);
        //delete record from database
        axios.delete(url, {
            params: record
        })
        .then(response => {
            console.log(response.data);
            console.log('Deleted record!');  
            return response.data;  
          })
          .catch(error=>console.log('error: ',error));  

          let temp = [...this.state.chorelog];
          let item = temp[this.state.deleteId];
          temp.splice(item, 1);
          this.setState({chorelog: temp});
        }

    getStars = () => {
        const url = this.state.baseUrl.concat('chorelog');


        axios.get(url, this.state.headers)
        .then(response => {
            console.log(response.data);
            console.log('chorelog retrieved!');  
            this.setState({chorelog: response.data});
            return response.data;
          })
          .catch(error=>console.log('error: ',error)); 
          
    }

    emptyGrid = () => {
        let grid = [];
        for(let i = 0; i < 6; i++){
        let row = [];
            for(let j = 0; j < 8; j++){
                row.push(null);
            }
            grid.push(row);
        }
        return grid;
    }

    setTotalStars = () => {
        let len = this.state.chorelog.length;
        this.setState({totalStars: len});
    }
    setStarGrid = () => {
        let chorelog = this.state.chorelog;
        let len = chorelog.length;
        let week = this.state.week;
        let chores = this.state.chores;
        let dayIndex, choreIndex;
        let grid = [];

        //console.log('rewards: ',chorelog);
        
        //let temp = [...this.state.grid];
        let temp = this.emptyGrid();
        
        //console.log('temp: ', temp);

        for( let i = 0; i < len; i++){
            choreIndex = chores.findIndex(element => {
                //console.log('element: ', element, 'chorelog[i].Chore', chorelog[i].Chore);
                return element ===chorelog[i].Chore;
            });            
            dayIndex = week.findIndex( element => {
                //console.log('element: ', element, 'chorelog[i].Date', chorelog[i].Date);
                return element === chorelog[i].Date;
            });

            grid.push({choreIndex,dayIndex});

            //console.log(grid);
            temp[choreIndex][dayIndex] = randomStar(1);
            //console.log('dayI: ',dayIndex, 'choreI: ', choreIndex);
        }
        // if(this.state.starsAt.length > grid.length)
        this.setState({grid: temp});
        // else
        //console.log('grid: ',grid);
        this.setState({starsAt: grid});
        //this.props.saveChorelog(true, temp);
    }

    setGrid = () => {
        let grid = [];
        for(let i = 0; i < 6; i++){
        let row = [];
            for(let j = 0; j < 8; j++){
                row.push(null);
            }
            grid.push(row);
        }
        //console.log('grid: ', grid);
        this.setState({grid:grid});
    }

    componentDidMount = () => {
        const chores = [
            'Clean Room',
            'Clear Table',
            'Make Bed',
            'Sort Laundry',
            'Vacuum or Sweep',
            'Feed Dog'
        ]

        this.setState({chores: chores});
        this.getStars();
        this.setGrid();
        this.setTotalStars();

        // if(this.props.savedChorelog)
        // {
        //     this.getStars();
        //     this.setStarGrid();
        //     this.setState({grid: this.props.chorelog})
        // } 
    }

    componentDidUpdate = () => { 
        // if(this.state.week.length === 0)
        // {
        // this.setThisWeek();
        // //this.setStarGrid();
        // }       
        // if(!this.props.savedChorelog)
        // {
        //     this.getStars();
        //     this.setStarGrid();
        //     //this.props.saveChorelog(true, this.state.grid);   
        // }
    }
    componentWillUnmount = () => {
       // this.props.saveChorelog(true, this.state.grid);   
        console.log('grid: ', this.state.grid);   
    }

    render() {
        return(<div className={classes.Chorelog}>
            <h2 className={classes.OpaqueBox}>My Chore Reward  -  Click buttons to refresh (Currently)</h2>
            <h3 className={classes.OpaqueBox}> Total Stars (Chore): {this.state.chorelog.length === 0 ? null : this.state.chorelog.length} </h3>
            {/* <button onClick={this.lastWeekClickHandler}>
              Last week                
            </button>
            <button onClick={this.thisWeekClickHandler}>
              This week                
            </button>     */}
            <ViewWeeks 
            thisWeekClickHandler ={this.thisWeekClickHandler}
            lastWeekClickHandler={this.lastWeekClickHandler}
            />
            <DisplayWeek 
            rewardClickHandler={this.rewardClickHandler}
            chores={this.state.chores}
            week={this.state.week}
            setStarGrid={this.setStarGrid}
            grid={this.state.grid}
            // savedChorelog={this.props.savedChorelog}
            />
        </div>)
    }
}

export default ChoreLog;