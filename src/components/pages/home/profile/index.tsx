import React from "react";
import { Container } from "../../../../styles/bases";
import { Margin } from "../../../../styles/utils";
import { ProfileWrapper, ProfileSocialLink } from "./Styled";
import { Row, Col, Button } from "../../../lib";
import ProfileIllustration from "../../../../images/illustration/profile.svg";
import Linkedin from "../../../../images/socialMedia/linkedin.svg";
import Instagram from "../../../../images/socialMedia/instagram.svg";
import Twitter from "../../../../images/socialMedia/twitter.svg";
import Facebook from "../../../../images/socialMedia/facebook.svg";

const LoanDetail: React.FC = () => (
  <ProfileWrapper>
    <Container>
      <Row align="center">
        <Col lg={6} md={8} sm={12}>
          <h2>Profile of Widya Imanesti</h2>
          <p>
            <i>0x1293898123xxx</i>
          </p>
          <Margin top={16}>
            <p>
              Hi, my name is Widya Imanesti but my friends call me Ines. I got
              accepted into two-year Master’s of Industrial & Labor Relations
              (MILR) program at Cornell University. It is the best HR master’s
              program in the US with world-class faculty members. The program
              will start in Fall Semester 2019.
            </p>
          </Margin>
          <Margin top={32}>
            <ProfileSocialLink
              href="https://id.linkedin.com/in/widya-imanesti"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Linkedin} alt="Socila - Media" width={24} />
            </ProfileSocialLink>
            <ProfileSocialLink
              href="https://www.instagram.com/wimanesti/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Instagram} alt="Socila - Media" width={24} />
            </ProfileSocialLink>
            <ProfileSocialLink
              href="https://www.instagram.com/wimanesti/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Twitter} alt="Socila - Media" width={24} />
            </ProfileSocialLink>
            <ProfileSocialLink
              href="https://www.facebook.com/widya.imanesti"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Facebook} alt="Socila - Media" width={24} />
            </ProfileSocialLink>
          </Margin>
          <Row align="center">
            <Col lg={4} md={12}>
              <Margin top={32}>
                <Button onClick={() => console.log("click")}>Read more</Button>
              </Margin>
            </Col>
          </Row>
        </Col>
        <Col lg={6} md={4} sm={12} text="center">
          <img
            src={ProfileIllustration}
            alt="HomeHero - Illustraion"
            width={400}
          />
        </Col>
      </Row>
    </Container>
  </ProfileWrapper>
);

export default LoanDetail;
