import React from 'react'
import { withNavbarAndFooter } from '../../hoc'
import HomeHero from './hero'
import TabHome from './tab'
import ModalWip from './modalWip'
import { getDeployedFromConfig } from '../../../utils/getDeployed'
import contractAddresses from '../../../config/ines.fund'
import { calcExpectedReturn } from '../../../utils/jsCalculator'
import { getTokenDetailsFromAddress } from '../../../utils/paymentToken'
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
import { getNetworkName } from '../../../utils/web3Utils'
import { ShowModal } from '../../lib'

export interface HomeState {
    networkName: string
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
        networkName: null,
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
        const networkName = await getNetworkName()
        ShowModal(<ModalWip networkName={networkName} />)

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
            )
            .map(async address => {
                const amount = await amountContributed(
                    crowdloanInstance,
                    address
                )
                return { address, amount }
            })
        )).sort((a, b) => (+a.amount > +b.amount ? -1 : 1)) // Sort contributors from the highest lending amount to the lending amount

        this.setState({
            networkName,
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
