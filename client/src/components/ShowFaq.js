import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchAllFaqs } from '../actions';
import { Link } from 'react-router-dom';

class ShowFaq extends Component {
    state = { activeIndex: null};
    componentDidMount() {
        this.props.fetchAllFaqs();
    }

    onTitleClick = (index) => {
        this.setState({activeIndex: index});
    }


    renderedItems = () => {
        console.log(this.props)
        if(!this.props.questions) {
            console.log("......");
            return null;
        }
        else {
            const list = this.props.questions.frequentquestions;
            return list.map((question, index) => {
                    const active = index === this.state.activeIndex ? 'active' : '';

                    return (
                        <React.Fragment key={question._id}>
                            <div 
                            className={`title ${active}`}
                            onClick={() => this.onTitleClick(index)}
                            >
                                <i className="dropdown icon"></i>
                                {question.question}
                            </div>
                            <div className={`content ${active}`}>
                                <p>{question.answer}</p>
                                <Link to={`/faqs/delete/${question._id}`} className="ui button negative">Delete</Link>                            </div>
                        </React.Fragment>
                    )
            })
        }
    }

    render() {
        return (
            <div className="ui styled accordion">
                {this.renderedItems()}
            </div>
        )
    }  
}

const mapStateToProps = (state) => {
    return { questions: state.faqs}
}

export default connect(mapStateToProps, { fetchAllFaqs})(ShowFaq);

 /*<p>Categeory : {question.categeories[0]}</p>*/
