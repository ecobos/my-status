import React from 'react'
import axios from 'axios'
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import Description from 'material-ui-icons/Description';
import Done from 'material-ui-icons/Done';
import NotInterested from 'material-ui-icons/NotInterested';
import Warning from 'material-ui-icons/Warning';
import Modal from 'material-ui/Modal';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    title: {
        flex: '0 0 auto',
        padding: '15px 0 10px 20px',
    },
    modalTitle: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    card: {
        minWidth: 275,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`
    },
    doneIcon: {
        fill: 'green'
    },
    noIcon: {
        fill: 'red'
    },
    warning: {
        fill: 'orange'
    }  
});

class Employeer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] , openModal: false, personContext: '', openSnackbar: false };
        this.updateDatabase = this.updateDatabase.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    updateDatabase(id, update) {
        axios.put('http://localhost:3001/candidate/' + id, update)
            .then(res => {
                this.setState({openSnackbar: false});
                console.log('data saved');
            }).catch(e => {
                console.error(e);
            })
    }

    componentDidMount() {
        axios.get('http://localhost:3001/candidate')
        .then(res => {
            this.setState({ data: res.data });
        })
        this.props.componentReady();
    }

    handleChange = (event) => {
        console.log('Event ->', event.target.name, event.target.value);
        let prevData = this.state.data;
        let index = prevData.findIndex(it => it['_id'] === event.target.name);
        let newData = prevData.slice(); // Gives us a copy of the old array
        let now = new Date();
        newData[index].status = event.target.value; 
        newData[index].lastContact = now.toString();
        this.setState({ data: newData , openSnackbar: true});
        this.updateDatabase(event.target.name, {status: event.target.value, lastContact: now.toString()});
    };

    handleOpenModal(person){
        this.setState({ openModal: true, personContext: person});
    };
    
    handleCloseModal = () => {
        this.setState({ openModal: false, personContext: ''});
    };

    handleOpenSnackbar = () => {
        this.setState({ openSnackbar: true });
      };
    
    handleCloseSnackbar = () => {
        //this.setState({ openSnackbar: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <div className={classes.title}>
                    <Typography variant="title">Sr. Software Engineer (#928394) candidates</Typography>
                </div>
                <Table className={classes.table}> 
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell numeric>Job Match</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Last Contact</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map(candidate => {
                            return (
                                <TableRow key={candidate['_id']}>
                                    <TableCell>{candidate.firstName}</TableCell>
                                    <TableCell>{candidate.lastName}</TableCell>
                                    <TableCell numeric>{candidate.matchScore}% <Description onClick={()=> this.handleOpenModal(candidate.firstName+' '+candidate.lastName)}/></TableCell>
                                    <TableCell>{candidate.phoneNumber}</TableCell>
                                    <TableCell>{candidate.lastContact}</TableCell>
                                    <TableCell>{
                                        <Select
                                            value={parseInt(candidate.status)}
                                            onChange={this.handleChange}
                                            name={candidate['_id']}
                                            //renderValue={value => `${value}`}
                                        >
                                            <MenuItem value={0}>Applied</MenuItem>
                                            <MenuItem value={1}>Review</MenuItem>
                                            <MenuItem value={2}>Interview</MenuItem>
                                            <MenuItem value={3}>Offer</MenuItem>
                                            <MenuItem value={4}>Accepted</MenuItem>
                                        </Select>}</TableCell>     
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openModal}
                    onClose={this.handleCloseModal}
                >
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.modalTitle}>Automatic Qualifications</Typography>
                            <Typography variant="headline" component="h2">
                                {this.state.personContext}
                            </Typography>
                            <Typography component="p">
                                <Done className={classes.doneIcon} /> Degree in relevent field<br />
                                <Done className={classes.doneIcon} /> GPA requirement met <br />
                                <Done className={classes.doneIcon} /> Git experience <br />
                                <Done className={classes.doneIcon} /> Javascript experience <br />
                                <NotInterested className={classes.noIcon} /> iOS Development<br />
                                <Warning className={classes.warning} /> Could not validate timeframe requirement <br />
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">See Full Resume</Button>
                        </CardActions>
                    </Card>
                </Modal>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
                    open={this.state.openSnackbar}
                    onClose={this.handleCloseSnackbar}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Updating changes...</span>}
                />
            </Paper>
        )
    }
}

export default withStyles(styles)(Employeer)