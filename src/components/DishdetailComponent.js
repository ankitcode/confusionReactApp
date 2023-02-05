import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }

  renderDish(dish) {
    if (dish != null)
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    else return <div></div>;
  }

  renderComments(comments) {
    const month = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sept",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec",
    }
    const commentsToDisplay = comments.map((comment) => {
      return (
        <>
          <div>
            <ul class="list-unstyled">
              <li>{comment.comment}</li>
              <li>
                -- {comment.author}, {month[comment.date.split("T")[0].split("-")[1]]}{" "}
                {comment.date.split("T")[0].split("-")[2]},{" "}
                {comment.date.split("T")[0].split("-")[0]}
              </li>
            </ul>
          </div>
        </>
      );
    });
    return (
      <>
        <h4>Comments</h4>
        <div>{commentsToDisplay}</div>
      </>
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.renderDish(this.props.selectedDish)}
        </div>
        <div className="col-12 col-md-5 m-1">
          {this.props.selectedDish.comments ? (
            this.renderComments(this.props.selectedDish.comments)
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

export default DishDetail;
