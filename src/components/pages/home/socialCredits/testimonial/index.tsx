import React from "react";
import { TestimonialAvatar } from "./styled";
import DefaultAvatar from "../../../../../images/avatar/default.png";
import { Margin } from "../../../../../styles/utils";

export interface TestimonialLinkedinState {
  expanded: number;
}

const listTestimonial = [
  {
    name: "Fadilla Tourizqua Zain",
    position: "Vice President of Marketing at Amartha",
    img:
      "https://media.licdn.com/dms/image/C5603AQGaRpXa22SN3w/profile-displayphoto-shrink_100_100/0?e=1567641600&v=beta&t=ZvY3weiX1MGyLOAKI9Xt0YRhqUMMXHudF6uONGtB9vU",
    desc:
      "Working with Widya was a privilege. She was an instrumental part of Amartha’s success in talent assessment, acquisition and development, and all aspects of human resources for early stage company. As one of the original employees at Amartha, she touches nearly all aspects of Amartha’s people and culture . Widya built high caliber department from the ground up, including teams to support recruiting (both field and HQ), performance management, and workplace services. She brought an A-team characters to the table whom other employees look up to. Widya is a witty, practical and influential HR leader who deals effectively with change and ambiguous situations. She is a quick study and has great self insight. She applies learnings from her prior experiences, and is very client centered -- definitely will be an asset to any company. "
  },
  {
    name: "Aria Widyanto",
    position:
      "Board Member & Chief Risk and Sustainability Officer - Driving Financial Inclusion through Technology",
    img:
      "https://media.licdn.com/dms/image/C5603AQH-e3bf_zmHwQ/profile-displayphoto-shrink_100_100/0?e=1567641600&v=beta&t=9p_YXfllBVnQSvKeP__PIpfsmc49Ywtxj5t6NPMF0zU",
    desc:
      "It's been a great time working with Widya Imanesti. In her capacity as a lead in people & culture division, she demonstrated strong leadership and enthusiasm in building the company's core team and helped building values for the company. While working for a newly established startup has higher risk of uncertainties, she demonstrated strong ability to adapt to the dynamic environment and helped us, the founding team, to form a great workplace where people are not only excel in their fields but also passionate about what they wish to accomplish with our company : a nation without poverty. "
  },
  {
    name: "Putri Nandi Pinta Agusria",
    position: "Marketing Strategy at XL Axiata",
    img:
      "https://media.licdn.com/dms/image/C4E03AQG549MPpB8n6g/profile-displayphoto-shrink_100_100/0?e=1567641600&v=beta&t=DZxqJBndY-F92Xf05ezoIEtOY3PWenSaya0oZbKTB1w",
    desc:
      "I work with Widya when she was my HR manager at berniaga, Widya has true compassion for his colleagues and co-workers. During the acquisition at Berniaga, Widya exercised every measure to ensure that employee's were successful in the management of their career transition also sastified with the result that company give to staff. Widya has an approachable and supportive attitude characteristics of great value in human resources and would be an asset to any organization. "
  },
  {
    name: "Elvina Komala",
    position: "Marketing Manager at Mudahmy",
    img: null,
    desc:
      "Widya is a young HR manager who cares deeply for people and takes seriously her responsibility to advocate all members of the team. She creates a market leading people strategy, a strategic HR leader, and expert tactician. Her skills to build an effective communication and partnership were of tremendous value. She is a pleasure to work with and an asset to any team."
  },
  {
    name: "Brahma Adhiyasa",
    position: "Finance and Accounting Manager at Snapcart",
    img:
      "https://media.licdn.com/dms/image/C5103AQGNLDq_e0UWhQ/profile-displayphoto-shrink_100_100/0?e=1567641600&v=beta&t=I97F1zBVBpWE_g0UVH7KJ0IocatJ7AcNFvdd1aX49SY",
    desc:
      "Widya has a good attitude, can motivate the team and has lot of creative ideas to make work atmosphere become fun and fresh. She also has excellent knowledge in Labor Laws which I believe can accelerate her career development."
  }
];

class TestimonialLinkedin extends React.Component<
  {},
  TestimonialLinkedinState
> {
  constructor(props: {}) {
    super(props);
    this.state = { expanded: 4 };
    this.handleExpand = this.handleExpand.bind(this);
  }

  handleExpand(index: number) {
    const { expanded } = this.state;
    const current = expanded === index ? expanded : index;
    this.setState(() => ({ expanded: current }));
  }

  render() {
    const { expanded } = this.state;
    return (
      <React.Fragment>
        {listTestimonial.map((list, index) => (
          <TestimonialAvatar
            key={index}
            onClick={() => this.handleExpand(index)}
            activeStyle={expanded === index}
          >
            {list.img === null ? (
              <img src={DefaultAvatar} alt="Default - Avatar" width={100} />
            ) : (
              <img src={list.img} alt="Avatar - User" />
            )}
          </TestimonialAvatar>
        ))}
        {listTestimonial.map((list, index) => (
          <Margin key={index} top={24}>
            {expanded === index && (
              <React.Fragment>
                <h6>{list.name}</h6>
                <small>
                  <i>{list.position}</i>
                </small>
                <Margin top={16}>
                  <p>{list.desc}</p>
                </Margin>
              </React.Fragment>
            )}
          </Margin>
        ))}
      </React.Fragment>
    );
  }
}

export default TestimonialLinkedin;