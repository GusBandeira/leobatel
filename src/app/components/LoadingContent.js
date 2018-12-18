import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components'

const LoadingRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 15px 0;
    padding: 30px 0;
    margin: auto;
`

class LoadingContent extends Component {
    state = {
        isLoading: false
    }

    render() {
        const { props: { isLoading } } = this
        return (
            <React.Fragment>
                {isLoading ? 
                    <LoadingRow>
                        <Col xs="12" className="">
                            <span className="custom-loader loading g margin-auto" />
                        </Col>
                    </LoadingRow>
                    :
                    this.props.children                    
                }
            </React.Fragment>
        )
    }
}

LoadingContent.propTypes = {
    isLoading: PropTypes.bool, // show or hide loading icon
    loadingType: PropTypes.string, // loading type. if 'table', the entire table will have a loading icon
    centerIcon: PropTypes.bool, // bool value to center the icon
};

export default LoadingContent;