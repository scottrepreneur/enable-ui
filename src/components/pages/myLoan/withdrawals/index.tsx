import React from "react";
import { Margin, Padding } from "../../../../styles/utils";
import { Row, Col, Button } from "../../../lib";
import { WithdrawalBox } from "./styled";
import FileIcon from "../../../../images/fileIcon.png";
import {
  TableCard,
  TableInline,
  TableTitleWrapper,
  TableTitle,
  TableTitleMobile
} from "../styled";
interface Withdrawal {
  to: string;
  amount: string;
}
interface WithdrawalProps {
  withdrawals: Withdrawal[];
  transacting: boolean;
  onWithdraw: () => {};
}

const Withdrawal: any = ({
  withdrawals,
  transacting,
  onWithdraw
}: WithdrawalProps) => (
  <React.Fragment>
    <h5>Withdrawals</h5>
    <Margin top={32}>
      <WithdrawalBox>
        <Row>
          <Col lg={6} md={12}>
            <Button color="green" onClick={onWithdraw} disabled={transacting}>
              Withdraw
            </Button>
          </Col>
        </Row>
        {!withdrawals || withdrawals.length === 0 ? (
          <React.Fragment>
            <Margin top={24}>
              <TableTitleWrapper>
                <TableTitle>
                  <p>Date</p>
                </TableTitle>
                <TableTitle>
                  <p>Amount</p>
                </TableTitle>
                <TableTitle>
                  <p>Status</p>
                </TableTitle>
              </TableTitleWrapper>
            </Margin>
            <Row text="center">
              <Col lg={12}>
                <Padding vertical={40}>
                  <img src={FileIcon} alt="File - Icon" />
                  <Margin top={24}>
                    <p>Your withdrawals with appear here</p>
                  </Margin>
                </Padding>
              </Col>
            </Row>
          </React.Fragment>
        ) : (
          // TODO @dennis, this is table if widrawals is present
          <React.Fragment>
            <Margin top={24}>
              <TableTitleWrapper>
                <TableTitle>
                  <p>Date</p>
                </TableTitle>
                <TableTitle>
                  <p>Amount</p>
                </TableTitle>
                <TableTitle>
                  <p>Status</p>
                </TableTitle>
              </TableTitleWrapper>
              <TableCard>
                <TableInline>
                  <TableTitleMobile>Date</TableTitleMobile>
                  <p>22 August 2021</p>
                </TableInline>
                <TableInline>
                  <TableTitleMobile>Amount</TableTitleMobile>
                  <p>12 Dai</p>
                </TableInline>
                <TableInline>
                  <TableTitleMobile>Status</TableTitleMobile>
                  <p>Paid</p>
                </TableInline>
              </TableCard>
              <TableCard>
                <TableInline>
                  <TableTitleMobile>Date</TableTitleMobile>
                  <p>22 August 2021</p>
                </TableInline>
                <TableInline>
                  <TableTitleMobile>Amount</TableTitleMobile>
                  <p>12 Dai</p>
                </TableInline>
                <TableInline>
                  <TableTitleMobile>Status</TableTitleMobile>
                  <p>Paid</p>
                </TableInline>
              </TableCard>
            </Margin>
          </React.Fragment>
          // withdrawals.map((withdrawal, indx) => (
          //   <p key={indx}>{JSON.stringify(withdrawal)}</p>
          // ))
        )
        // "" // To Do (Dennis): Displaying withdrawals
        }
      </WithdrawalBox>
    </Margin>
  </React.Fragment>
);

Withdrawal.defaultProps = {
  withdrawals: []
};

export default Withdrawal;
