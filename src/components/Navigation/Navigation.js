import React from 'react';
import classes from './Navigation.module.css';

const setActiveTab = (selectedTab) => {
  const tabs = document.getElementsByClassName(classes.SideItem);
    if(selectedTab === 'length')
     selectedTab = 'distance/length';  //console.log(tabs);
  for(let i = 0; i < tabs.length; i++) {
    let tab = tabs[i].innerHTML.toLowerCase();

    if(tab === selectedTab)
    {    
      tabs[i].className = tabs[i].className.replace(classes.Item,classes.ActiveTab);
    } else
      tabs[i].className = tabs[i].className.replace(classes.ActiveTab,classes.Item);
         
    // console.log(`tab[${i}]:`, tab);   
    // console.log(`tab[${i}].className:`, tabs[i].className);   
  }
    // console.log('selectedTab:',selectedTab);
}

const SideNav = (props) => {
  let classNav = classes.SideItem + ' ' + classes.Item;
  setActiveTab(props.tab);
    return(
    <div className={classes.SideNav}>
        <ul className={classes.List} id='sideNav'>
          <li className={classNav} onClick={(event)=>props.click(event,'area')}>
            Area
          </li>           
          <li className={classNav} onClick={(event)=>props.click(event,'length')}>
            Distance/Length
          </li>          
          <li className={classNav} onClick={(event)=>props.click(event,'force')}>
            Force
          </li>
          <li className={classNav} onClick={(event)=>props.click(event,'pressure')}>
            Pressure
          </li>
          <li className={classNav} onClick={(event)=>props.click(event,'temperature')}>
            Temperature
          </li>
          <li className={classNav} onClick={(event)=>props.click(event,'torque')}>
            Torque
          </li>
          <li className={classNav} onClick={(event)=>props.click(event,'vacuum')}>
            Vacuum
          </li>
          <li className={classNav} onClick={(event)=>props.click(event,'volume')}>
            Volume
          </li>
          <li className={classNav} onClick={(event)=>props.click(event,'weight')}>
            Weight
          </li>
         </ul>
    </div> 
    )

}

const NavigationMenu = (props) => {
    let classNav = classes.DropDown + ' ' + classes.TopItem;

     let navbar =  
        <ul className={classes.TopList}>
            <li className={classes.TopItem} onClick={(event) => props.clicked(event,'payroll')}>
                Payroll Calculator
            </li>
            <li className={classes.TopItem} onClick={(event) => props.clicked(event,'loan')}>
                Loan Calculator
            </li>
            <li className={classNav}            
            onClick={(event) => props.clicked(event,'convert')}>
                Conversion Calculator
                {/* <DropDownMenu
                click={props.click}/> */}
            </li>
            <li className={classes.TopItem} onClick={(event) => props.clicked(event,'scraper')}>
                Scraper
            </li>
            <li className={classes.TopItem} onClick={(event) => props.clicked(event,'todo')}>
                To-Do List
            </li>
        </ul>

    return(
    <div className={classes.Nav}>
        <div className={classes.TopNav}>
        {navbar}
        </div>
    </div>
    );
}

export default NavigationMenu;
export {SideNav};