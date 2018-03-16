import React from 'react';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress'
import Fade from 'material-ui/transitions/Fade';
import Grid from 'material-ui/Grid';
import Header from './Header'
import Main from './Main'
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import Chat from 'material-ui-icons/Chat';
import ViewList from 'material-ui-icons/ViewList';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    this.ready = this.ready.bind(this);
  }

  componentDidMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    ele.classList.add('available');
  }

  ready() {
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Header />
          <Fade
            in={this.state.isLoading}
            unmountOnExit
          >
            <LinearProgress color='secondary' />
          </Fade>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Main componentReady={this.ready} />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={12}>
          <BottomNavigation
            value={0}
            showLabels
          >
            <BottomNavigationAction label="View Status" icon={<ViewList />} />
            <BottomNavigationAction label="Chat" icon={<Chat />} />
          </BottomNavigation>
        </Grid>
      </Grid>
    );
  }
}

export default App;
