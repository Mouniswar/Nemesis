import React from 'react';
import { connect } from 'react-redux';
import { fetchFaq, deleteFaq } from '../actions';
import history from '../history';
import Modal from './Modal';
import { Link } from 'react-router-dom';


class DeleteFaq extends React.Component {
    componentDidMount() {
        this.props.fetchFaq(this.props.match.params.id)
    }

    
    renderActions() {
        const id = this.props.match.params.id;
        return (
            <React.Fragment>
                <button 
                    onClick={() => this.props.deleteFaq(id) } 
                    className="ui button negative">
                    Delete
                </button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }

    renderContent () {
        if(!this.props.faq) {
            return 'Are you sure you want to delete this FAQ?'
        }

        return `Are you sure you want to delete the stream with Question: ${this.props.faq.question}`
    }

    render() {
        return (
            <Modal 
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return { faq: state.faq}
}

export default connect(mapStateToProps, { fetchFaq, deleteFaq })(DeleteFaq);