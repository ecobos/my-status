import React from 'react'
import { Switch, Route } from 'react-router-dom'
import VerticalLinearStepper from './js/VerticalLinearStepper'
import DataComponent from './js/DataComponent'
import Employeer from './js/Employeer'

class Main extends React.Component {
    render(){
        return (
            <Switch>
                {/* <Route exact path='/' render={()=> <VerticalLinearStepper componentReady={this.props.componentReady}/>} /> */}
                <Route exact path='/employeer' render={()=><Employeer componentReady={this.props.componentReady}/>} />
                <Route path='/:candidate' render={({match})=><VerticalLinearStepper match={match} componentReady={this.props.componentReady}/>} />
            </Switch>
        );
    }
}

export default Main