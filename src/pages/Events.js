import React, { Component } from 'react';
import '../styles/Events.css';

class Events extends Component {
    render() { 
        return (  
            <div className="events-container" >
                <iframe src="https://calendar.google.com/calendar/b/1/embed?showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=b4hphe0q7oq285759aa1e5o03c%40group.calendar.google.com&amp;color=%232F6309&amp;ctz=America%2FToronto" width="700" height="500" frameBorder="0" scrolling="no"></iframe>
            </div>
        );
    }
}
 
export default Events;