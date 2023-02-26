import { React, Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";

import { Link } from "react-router-dom";

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      isModalOpen: false,
      touched: {
        name: false,
      },
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };
  validate(name) {
    const errors = {
      name: "",
    };
    if (name && this.state.touched.name && name.length < 3)
      errors.name = "Name should be >= 3 characters";
    else if (name && this.state.touched.name && name.length > 15)
      errors.name = "Name should be <= 15 characters";
    return errors;
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleSubmitComment(event) {
    this.toggleModal();
    console.log(
      "rating: " +
        this.rating.value +
        " name: " +
        this.name.value +
        " comment: " +
        this.comment.value
    );
    this.props.addComment(
      this.props.dishId,
      this.rating.value,
      this.name.value,
      this.comment.value
    );
    event.preventDefault();
  }
  render() {
    const errors = this.validate(this.state.name);
    return (
      <>
        <Button variant="outline-secondary" onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmitComment}>
              <FormGroup>
                <Label htmlFor="rating">Rating</Label>
                <Input
                  type="select"
                  id="rating"
                  name="rating"
                  innerRef={(input) => (this.rating = input)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={this.state.name}
                  valid={errors.name === ""}
                  invalid={errors.name !== ""}
                  onBlur={this.handleBlur("name")}
                  onChange={this.handleInputChange}
                  innerRef={(input) => (this.name = input)}
                />
                <FormFeedback>{errors.name}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="comment">Comment</Label>
                <Input
                  type="textarea"
                  id="comment"
                  name="comment"
                  rows="6"
                  innerRef={(input) => (this.comment = input)}
                />
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

function RenderDish({ dish }) {
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

function RenderComments({ comments, addComment, dishId }) {
  const commentsToDisplay = comments.map((comment) => {
    return (
      <>
        <div>
          <ul class="list-unstyled">
            <li>{comment.comment}</li>
            <li>
              -- {comment.author},{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(comment.date)))}
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
      <CommentForm dishId={dishId} addComment={addComment} />
    </>
  );
}

const DishDetail = (props) => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {props.dish ? <RenderDish dish={props.dish} /> : <></>}
        </div>
        <div className="col-12 col-md-5 m-1">
          {props.comments ? (
            <RenderComments
              comments={props.comments}
              addComment={props.addComment}
              dishId={props.dish.id}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
