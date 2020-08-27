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

const NavigationMenu = (props) => {
    //let classNav = classes.DropDown + ' ' + classes.TopItem;

     let navbar =  
        <ul className={classes.TopList}>
         <li className={classes.TopItem} onClick={(event) => props.clicked(event,'book')}>
                Book Log
            </li>
            <li className={classes.TopItem} onClick={(event) => props.clicked(event,'rewards')}>
                Rewards
            </li>
            <li className={classes.TopItem} onClick={(event) => props.clicked(event,'hangman')}>
                Hangman
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