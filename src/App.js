import React, { Component } from 'react';
import PayrollCalculator from './components/Calculator/PayrollCalculator';
import Navigation from './components/Navigation/Navigation';
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
      default: ;
    }

    return (
    <div className="App">
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
