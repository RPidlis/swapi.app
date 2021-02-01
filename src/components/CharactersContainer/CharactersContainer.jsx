import React from 'react'
import { connect } from 'react-redux'
import { redirectToProfile, requestCharacters, setDislike, setLike } from '../../redux/CharacterReducer'
import AutoCompleteComponent from './CharactersComponent/AutoCompleteComponent'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { getCharacters, getLikedCharacters, getLikedId } from '../../redux/users-selectors'
import SimpleTabs from './CharactersComponent/SimpleTabComponent'
import { Grid } from '@material-ui/core'

class CharactersContainer extends React.Component {
    componentDidMount() {
        // get all characters
        this.props.requestCharacters()
    }

    redirect = (id) => {
        // redirect here to /character/{id}
        this.props.history.push(`/profile/${id}`)
    }

    like = (id) => {
        // dispatch like user by id
        this.props.setLike(id)
    }

    dislike = (id) => {
        // dispatch dislike user by id
        this.props.setDislike(id)
    }

    render() {
        return (
            <>
                <Grid
                    container
                    direction="column"
                    justify="space-around"
                    alignItems="center"
                >
                    <AutoCompleteComponent
                        redirect={this.redirect}
                        characters={this.props.characters}
                    />
                    <SimpleTabs {...this.props}
                                redirect={this.redirect}
                                dislike={this.dislike} like={this.like}
                    />
                </Grid>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    characters: getCharacters(state),
    likesId: getLikedId(state),
    likedCharacters: getLikedCharacters(state)
})

export default compose(
    withRouter,
    connect(mapStateToProps, {requestCharacters, setLike, setDislike, redirectToProfile})
)
(CharactersContainer)