import React, {Component} from 'react';
import axios from 'axios';
import classes from './Calculator.module.css';

//const port = process.env.PORT  || 5000;

const DisplayPayroll = (props) => {
    const info = props.payroll;

    const inputs = 
         <tr>
            <td>
                <input type="number" name="Invoice"
                onChange = {props.changeHandler}
                />
            </td>
            <td>
                <input type="date" name="Date"
                onChange = {props.changeHandler}
                />
            </td>
            <td>
                <input type="number" name="Parts"
                onChange = {props.changeHandler}
                />
            </td>
            <td>
                <input type="number" name="Labor"
                onChange = {props.changeHandler}
                />
            </td>       
            <td>
                <button 
                //onClick={() => window.alert('backend off at the moment...')}
                onClick={props.setNewRecord}
               >
                    Add
                </button>
            </td>
         </tr>

    let commissionAll = 0;
    let totalAll = 0;

    const items = info !== undefined ? info.map(element => {
        let total = 0;
        const labor = parseFloat(element.Labor);
        const parts = parseFloat(element.Parts);
        total += labor;
        total += parts;

        let commission = total * props.commissionRate;
        
        commissionAll += commission;
        totalAll += total;

        return(<tr key={element.Invoice}>
            <td>
                {element.Invoice}
            </td>
            <td>
                {element.Date}
            </td>
            <td>
                {parts.toFixed(2)}
            </td>
            <td>
                {labor.toFixed(2)}
            </td>       
            <td>
                {total.toFixed(2)}
            </td>          
            </tr>
        )
    }) : null;
    
    const calculations = <tr>
        <td>Commission</td>
        <td>$ {commissionAll.toFixed(2)}</td>
        <td>Total</td>
        <td>$ {totalAll.toFixed(2)}</td>
    </tr>

    return(<div>
    <table className={classes.Table}>
        <thead>
            <tr className={classes.Row}>
             <th>Invoice</th>
             <th>Date</th>
             <th>Parts</th>
             <th>Labor</th>
             <th>Total</th>
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

class PayrollCalculator extends Component {
    state = {
        baseUrl: `/api/`,
        headers: {
            "Content-Type": "application/json"
          },
        commissionRate: 0.055,
        payroll: [],
        Invoice: '',
        Date: '',
        Parts: 0,
        Labor: 0,
        sample: [
            {
              Invoice: '001',
              Date: 'Aug 18',
              Parts: 0,
              Labor: 25.50
            },
            {
              Invoice: '002',
              Date: 'Aug 18',
              Parts: 0,
              Labor: 65
            }
        ]
        
    };

    setNewRecord = () => {
        const I = this.state.Invoice;
        const D = this.state.Date;
        const P = this.state.Parts;
        const L = this.state.Labor;

        const newRecord ={   
            Invoice: I,
            Date: D,
            Parts: P,
            Labor: L,
        }

        //this.setState({newRecord: newRecord});

        const url = '/api/payroll/add';//this.state.baseUrl.concat('payroll/add'); 
        //add new record into database
        axios.post(url, newRecord)
        .then(response => {
            console.log(response.data);
            console.log('Added new record!');  
            return response.data;  
          })
          .catch(error=>console.log('error: ',error)); 


          const nPayroll = [...this.state.payroll, newRecord];
          this.props.setPayroll(nPayroll);
          this.setState({payroll: nPayroll});
          console.log('nPayroll: ', nPayroll);
          console.log('newRecord: ', newRecord);
          
          this.props.setRenderPayroll(true);
    }

    changeHandler = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        let obj = {[name]: val};
        this.setState(obj);
        //console.log('obj: ', obj);
    }

    //fetch payroll documents from mongoDB
    getPayroll = () => { 
        console.log('Scraping payroll...');
        const url = this.state.baseUrl.concat('payroll');//'/api/payroll';
        const payroll = axios.get(url, this.state.headers)
        .then(response => {
            console.log(response.data);
            console.log('payroll scraped!');  
            return response.data;  
          })
          .catch(error=>console.log('error: ',error)); 
    
        payroll.then(element => {
          //console.log(element);
          this.setState({payroll:element});
          console.log('payroll saved to array!');
        });

        this.props.setRenderPayroll(false);

      }
      
      componentDidMount = () => {
          if(this.props.reloadPayroll)
          {
              this.getPayroll();
              this.props.setPayroll(this.state.payroll);
              this.props.setRenderPayroll(false);
              //this.props.setPayroll(this.state.sample);
          } else {
              //this.setState({sample: this.props.payrollSaved});
              this.setState({payroll: this.props.payrollSaved});
          }
      }
      componentWillUnmount = () => {
          this.props.setRenderPayroll(false);
          this.props.setPayroll(this.state.payroll);
          //this.props.setPayroll(this.state.sample);
          console.log('payroll component unmounting!');
          //axios.get('/close');
      }

      componentDidUpdate = () => {
        // if(this.props.reloadPayroll)
        // {
        //     //console.log('this.state.payroll (didUpdate): ',this.state.payroll);
        //     //this.props.setPayroll(this.state.payroll);
        //     //this.props.setRenderPayroll(false);
        // } else {
        //     //
        // }
        //this.getPayroll();
      }

    render(){
        return(
            <div>
                <h3>*Almost working*</h3>
                <DisplayPayroll 
                setNewRecord={this.setNewRecord}
                changeHandler={this.changeHandler}
                payroll={this.state.payroll}
                //payroll={this.state.sample}
                commissionRate={this.state.commissionRate}
                />
            </div>
        )
    }
}

export default PayrollCalculator;