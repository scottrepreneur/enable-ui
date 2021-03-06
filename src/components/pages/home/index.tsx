import React from 'react'
import { withNavbarAndFooter } from '../../hoc'
import HomeHero from './hero'
import TabHome from './tab'
import ModalWip from './modalWip'
import { getDeployedFromConfig } from '../../../utils/getDeployed'
import contractAddresses from '../../../config/ines.fund'
import { getTokenDetailsFromAddress } from '../../../utils/paymentToken'
import { getBlock } from '../../../utils/web3Utils'
import {
    getPrincipalToken,
    getPrincipalRequested,
    getLoanMetadataUrl,
    amountContributed,
    FundEvent,
} from '../../../utils/crowdloan'
import {
    fetchLoanMetadata,
    getExpectedSalary,
    getIncomeSharePercentage,
    getLoanPeriod,
} from '../../../utils/metadata'
import { ShowModal } from '../../lib'

export interface HomeState {
    loanPeriod: string
    interestRate: string
    principalRequested: string
    expectedSalary: string
    contributors: any
    paymentToken: object
    crowdloanInstance: object
    loanMetadata: object
}

class Home extends React.Component<{}, HomeState> {
    state = {
        loanPeriod: null,
        interestRate: null,
        principalRequested: null,
        expectedSalary: null,
        contributors: [],
        paymentToken: null,
        crowdloanInstance: null,
        loanMetadata: null,
    }

    componentDidMount = async () => {
        ShowModal(<ModalWip />)

        const crowdloanInstance = await getDeployedFromConfig(
            'Crowdloan',
            contractAddresses
        )
        const paymentToken = await getTokenDetailsFromAddress(
            await getPrincipalToken(crowdloanInstance)
        )

        const loanMetadataUrl = await getLoanMetadataUrl(crowdloanInstance)
        const principalRequested = await getPrincipalRequested(
            crowdloanInstance
        )
        const loanMetadata = await fetchLoanMetadata(loanMetadataUrl)

        const loanPeriod = await getLoanPeriod(loanMetadata)
        const interestRate = await getIncomeSharePercentage(loanMetadata)
        const expectedSalary = await getExpectedSalary(loanMetadata)

        const fundEvents: any[] = await FundEvent(crowdloanInstance, {
            fromBlock: 0,
            toBlock: 'latest',
        })

        const contributors = (await Promise.all(
            Array.from(
                new Set(fundEvents.map(event => event.returnValues.sender))
            ).map(async address => {
                const amount = await amountContributed(
                    crowdloanInstance,
                    address
                );
                const contributions = fundEvents.filter(event => event.returnValues.sender === address).sort((a,b) => a.blockNumber > b.blockNumber ? 1 : 0);
                const lastContribution = (await getBlock(contributions[contributions.length-1].blockHash)).timestamp;
                return { address, amount, lastContribution }
            })
        )).sort((a, b) => (+a.amount > +b.amount ? -1 : 1)) // Sort contributors from the highest lending amount to the lending amount

        this.setState({
            loanPeriod,
            interestRate,
            expectedSalary,
            principalRequested,
            contributors,
            paymentToken,
            crowdloanInstance,
            loanMetadata,
        })
    }

    render() {
        return (
            <React.Fragment>
                <HomeHero
                    loanPeriod={this.state.loanPeriod}
                    interestRate={this.state.interestRate}
                    contributors={this.state.contributors}
                    loanMetadata={this.state.loanMetadata}
                />
                <TabHome
                    loanPeriod={this.state.loanPeriod}
                    interestRate={this.state.interestRate}
                    contributors={this.state.contributors}
                    paymentToken={this.state.paymentToken}
                    crowdloanInstance={this.state.crowdloanInstance}
                    expectedSalary={this.state.expectedSalary}
                />
            </React.Fragment>
        )
    }
}

export default withNavbarAndFooter(Home)
