import React, { Component } from 'react';

class GetAllComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: '',
      isEdit: false,
      // value: ''
    }
  }

  componentDidMount() {

  }

  handleChange = (e) => {
    console.log(e.target)
    this.setState({
      // value: e.target.value
      // comment: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // this.state.value
  }

  render() {
    const { comment } = this.props
    return (

      <div>
        {comment === undefined ? <h2>Loading . . .</h2> :
          (
            <div>
              <p>{comment}</p>
              <form>
                <label>
                  Put Comment Here:
                  <input type='text' value={this.state.comment} onChange={this.handleChange} />
                </label>
                <input type='submit' value='submit' />
              </form>
              <button
                onClick={() => {
                  this.setState({
                    isEdit: true
                  })
                  // test path here
                  console.log('')
                }}
                // needs path to be check before finalizing
              >Edit</button>
              <button
              onClick={()=>{
                // delete path
                this.props.history.push('/matches')
              }}
              >Delete Me</button>
            </div>
          )

        }
      </div >
    )
  }
}
export default GetAllComment;

// how to make a mock component to do test?
/*
questions:
should i pretty much recreate what is inside match.js?
not everything, the ids are diferent,
because match.js belonds to two users
and comments belong to matches

in this component i will the other comment components

***
question regarding the write message promt in the match screen,
where does that go or where is this store?
can i use that to create the comment?




*/