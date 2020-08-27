import React, { Component } from 'react';
import PayrollCalculator from './components/Calculator/PayrollCalculator';
import Navigation from './components/Navigation/Navigation';

import BookLog from './components/Log/BookLog';
import Hangman from './components/SightWords/Hangman';
import Rewards from './components/Log/RewardLog';

import classes from './extra.module.css';
// import headerImg from './assets/eeveeBackground1.jpg';

class App extends Component{

  state = {
    displayApp:'',
    updateList: true,
    payroll: [],
    reloadPayroll: true,
  }
  updateSelection = () => {
    this.setState({updateList: !this.state.updateList});
  }
  
  setPayroll = (payroll) => {
    this.setState({payroll:payroll});
    //this.setRenderPayroll(false);
  }

  setRenderPayroll = (val) => {
    this.setState({reloadPayroll:val});
  }

  setConversionHandler = (event,unit) => {
    this.setState({conversionType: unit});
    this.setState({updateList: true});
    console.log(unit);
    console.log(event.target.className);
//    event.target.className = classes.ActiveTab;
    
  }

  showComponentHandler = (event, item) => {
    this.setState({displayApp: item})
    this.sideNavHandler();
  }

  showSideNav = () => {
        this.setState({style: {display:'block'}})
  }

  hideSideNav = () => {
        this.setState({style: {display:'none'}})
    
  }
  sideNavHandler = () => {
    if(this.state.displayApp === 'convert'){
      this.showSideNav();   
    } else this.hideSideNav();
  }

  render()
  { 
    let mainComponent = null;
    switch(this.state.displayApp){
      case 'payroll': 
        mainComponent = <PayrollCalculator 
        setPayroll={this.setPayroll}
        setRenderPayroll={this.setRenderPayroll}
        reloadPayroll={this.state.reloadPayroll}
        payrollSaved={this.state.payroll}
        />;
      break; 
      case 'book': mainComponent = <BookLog />;
      break;     
      case 'rewards': mainComponent = <Rewards />;
      break;        
      case 'hangman': mainComponent = <Hangman />;
      break;        
      
      default: ;
    }

    return (
    <div className="App">
      <div className={classes.Header}>
        {/* <img src={headerImg} alt='headerImg' className={classes.HeaderImage}/> */}
         <h3 className={classes.HeaderText}>
           KAILYA'S STARS 
         </h3>
      </div>
      <Navigation
      appType={this.state.displayApp}
      click = {this.setConversionHandler}
      clicked={this.showComponentHandler}/>
      {mainComponent}
    </div>
     );
  }
}

export default App;
