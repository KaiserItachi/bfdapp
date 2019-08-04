
import React from "react";
import gql from 'graphql-tag';
import { BarChart } from "react-d3-components";
import { Query } from 'react-apollo';

const GROUPED_QUERY = gql `
    query {
        cashFlow{
        month,
        payable,
        receivable
        }
    }
`;

const GroupedBar =()=> {

    return (
        <React.Fragment>
            <Query query = { GROUPED_QUERY}>
                {({loading, error, data}) => {
                    if(loading) return <h4>Loading...</h4>;
                    if(error) console.log(error);
                    
                    if(data){
                        let resData = [
                            {
                                label: "payable",
                                values: data.cashFlow.map( val=>{return { x: val.month, y: val.payable} })
                            },
                            {
                                label: "receivable",
                                values: data.cashFlow.map( val=>{return { x: val.month, y: val.receivable} })
                            }
                        ]
                        return(
                        <td class="rwd-table">
                            <h3><center>Cashflow Dashboard</center></h3>
                            <table>
                                <tr>
                                    <th>Bank Name</th>
                                    <th>Account Number</th>
                                    <th>Balance</th>
                                </tr>
                            </table>
                            <div id ="groupedChart" className="display-container">
                                <BarChart groupedBars data={resData} width={800} height={400} margin={{ top: 10, bottom: 50, left: 50, right: 10 }} />
                            </div>
                        </td>
                        );
                    }
                }}
            </Query>
        </React.Fragment>
    );
}

export default GroupedBar;












