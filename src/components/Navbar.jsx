import React, { Component } from "react";
import Dash from './Dash';
import findCountry from './searchFilter/countries';
import '../styles/navbar.css';
import axios from 'axios';

class Navbar extends Component {
    constructor() {
        super();

        this.getInput = this.getInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            userInput: 'United Kingdom',
            userReturnedInput: '', 
            countryTotal: '',
            countryFromTo: '',

            confirmed: '',
            deaths: '',
            recovered: '',

            splitMonths: null,
            splitCases: null
        };

        this.now = new Date();

        this.twoDigit = (result) => {
            if (result < 10) {
                return ('0' + result)
            }
            else {
                return ('' + result)
            }
        }

        this.date = {
            year: this.twoDigit(this.now.getFullYear()), month: this.twoDigit(this.now.getMonth()), day: this.twoDigit(this.now.getDay() -1)
        }
    }

    // Default start up click 
    componentDidMount() {
        this.handleClick();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.handleClick();
        }
    }

    // Get total
    // https://api.covid19api.com/total/dayone/country/south-africa
    // properties: confirmed, deaths, recovered

    // Get date from/to
    // https://api.covid19api.com/total/country/south-africa/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z
    // properties: Array amount(days), cases per day


    getInput(e) {
        this.setState({userInput: e.target.value});
    }

    handleClick() {

        this.setState({userReturnedInput: findCountry(this.state.userInput, true)}, () => {

            const {year, month, day} = this.date;

            this.setState({
                userSubmitted: this.state.userReturnedInput,
                countryTotal: `https://api.covid19api.com/total/dayone/country/${this.state.userReturnedInput}`,
                countryFromTo: `https://api.covid19api.com/total/country/${this.state.userReturnedInput}/status/confirmed?from=2020-01-01T00:00:00Z&to=${year}-${month}-${day}T00:00:00Z`
    
            }, () => {this.fetchData(this.state.countryTotal, this.state.countryFromTo)});

        })
        
    }

    fetchData(ct, cft) {
        // confirmed, deaths, recovered
        axios.get(ct)
        .then((res) => {this.getTotalCDR(res.data)})

        // cases from day 1
        axios.get(cft)
        .then((res) => {this.getCasesPerMonth(res.data)})
    }

    getTotalCDR(data) {
        this.setState({
            confirmed: data[data.length -1].Confirmed,
            deaths: data[data.length -1].Deaths,
            recovered: data[data.length -1].Recovered
        })
    }

    getCasesPerMonth(data) {

        // Loop backwards through array, storing the first date in temp variable and case amount in array, compare next 
        // iteration date with prev variable, if true replace var with current date and proceed loop.
        // if false, push new case to array and prev date variable to array and procceed loop.

        let i = data.length -1;

        // This needs to be updated when the date changes
        let currentDate = data[i].Date.slice(6,7)

        let addDates = [currentDate];
        let addCases = [data[i].Cases];

        while(i > 0) {

            if ((data[i].Date).slice(6,7) !== currentDate) {

                addDates.push((data[i].Date).slice(6,7));
                addCases.push(data[i].Cases);

                currentDate = (data[i].Date).slice(6,7);
            }

            if ((data[i].Date).slice(6,7) === '1') {
                break;
            }

            i--;

        }

        let orderedDates = [];
        let orderedCases = [];

        this.flipAndPush(addDates, orderedDates);
        this.flipAndPush(addCases, orderedCases);

        let writtenMonths = [];

        orderedDates.forEach((date) => {
            writtenMonths.push(this.findMonth(date));
        });

        this.setState({splitMonths: writtenMonths, splitCases: orderedCases});
    }

    flipAndPush(item, holder) {
        for (var i=item.length-1; i>=0; i--) {
            holder.push(item[i]);
        }
    }

    findMonth(MonthNumber) {

        this.months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ]

        return (this.months[MonthNumber]);
    }

    render() {
        
        return(
            <div>
                <div>
                    <div className="navbar">
                        <div className="medianCarrier">
                            <div className="gridify">
                                <div className="locationHeader">
                                    <h3>Location:</h3>
                                </div>
                                <input className="searchBar" type="text" placeholder="Enter Location" onChange={this.getInput} value={this.state.userInput}/>
                                <button className="button" onClick={this.handleClick}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

                <Dash 
                    selectedPage = {this.props.selectedPage}
                    userSubmitted = {this.state.userSubmitted}

                    nhsData = {this.props.nhsData}
                
                    confirmed = {this.state.confirmed} 
                    deaths = {this.state.deaths} 
                    recovered = {this.state.recovered}

                    splitDays = {this.state.splitMonths}
                    splitCases = {this.state.splitCases}
                />
            </div>
        )
    }
}

export default Navbar;