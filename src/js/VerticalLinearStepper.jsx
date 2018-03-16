import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import citycenter from '../assets/citycenter.png';
import congrats from '../assets/congrats.gif';
import excited from '../assets/excited.gif';



const styles = theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
    stepArea: {
        fontSize: '18px'
    }
});

function getSteps() {
    return ['Applied', 'The Review', 'The Interview', 'The Offer', 'Acceptance'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return (<p>
                We received your application for the <b>Sr. Software Engineer (#928394)</b> role!<br />
                I will send you a text message when your application status changes.</p>);
        case 1:
            return (<p>Your application is in review by the a Supply Chain-Transportation engineering manager.</p>);
        case 2:
            return (<p>Congratulations, you got the inteview! Details: <br />
                <img src={citycenter} width="450" height="auto" /><br />
                33 South 6th St, Minneapolis, MN 55402 <br />

                March 20, 2018 <br />
                8:00 AM CDT <br />

                Please check in at the security desk.</p>);
        case 3:
            return (<p>We want you on our team! <br />
                <img src={congrats} width="450" height="auto" /><br />

                We like the way you think and feel that you are a fit for the <b>Sr. Software
                    Engineer</b> role. We at Target take pride in offering a competative salary. Our
                    offer is $xx,xxx salary with full benefits.</p>);
        case 4:
            return (<p>Awesome! Welcome to Target!<br />
                <img src={excited} width="450" height="auto" />
            </p>);
        default:
            return (<p>
                <Typography>We received your application for the <b>Sr. Software Engineer (#928394)</b> role!</Typography><br />
                <Typography>I will send you a text message when your application status changes.</Typography></p>);
    }
}

class VerticalLinearStepper extends React.Component {
    constructor(props) {
        super(props);
        this.state = { applicant: "", activeStep: 0 }
    }

    componentDidMount() {
        let candidate = this.props.match.params.candidate;
        axios.get('http://localhost:3001/candidate/' + candidate)
            .then(res => {
                let person = res.data[0];
                this.setState({
                    applicant: person.firstName + ' ' + person.lastName,
                    activeStep: parseInt(person.status)
                });
                this.props.componentReady();
            });
    }

    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1,
        });
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1,
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return (
            <div className={classes.root}>
                <h1>{this.state.applicant}</h1>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    <div className={classes.stepArea}>
                                        {getStepContent(index)}
                                    </div>
                                    {/* <div className={classes.actionsContainer}>
                                        <div>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={this.handleBack}
                                                className={classes.button} >
                                                Back
                                            </Button>
                                            <Button
                                                variant="raised"
                                                color="primary"
                                                onClick={this.handleNext}
                                                className={classes.button} >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                            </Button>
                                        </div>
                                    </div> */}
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} className={classes.resetContainer}>
                        <Typography>All steps completed - you&quot;re finished</Typography>
                        <Button onClick={this.handleReset} className={classes.button}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </div>
        );
    }
}

VerticalLinearStepper.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);