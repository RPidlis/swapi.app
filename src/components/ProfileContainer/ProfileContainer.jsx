import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProfile, storePhoto } from '../../redux/CharacterReducer'
import AvatarComponent from './AvatarComponent/AvatarComponent'
import ava from '../../assets/image/ava.png'
import { Button, Grid } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        marginTop: 20
    },
    media: {
        height: 0,
        paddingTop: '56.25%' // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    },
    avatar: {
        backgroundColor: red[500]
    }
}))

const ProfileContainer = (props) => {
    const {profile, getProfile} = props
    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)
    const history = useHistory()
    const userId = props.match.params.userId

    useEffect(() => {
        if (Number.parseInt(userId)) {
            getProfile(userId)
                .catch(() => {
                    history.push('/404')
                })
        }
    }, [getProfile, history, userId])

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    return (
        <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="center"
        >
            <Card className={classes.root}>

                <button onClick={() => history.push('/')}>back</button>

                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {profile.name}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <AvatarComponent
                                storePhoto={props.storePhoto}
                                photo={props.photo}
                            />
                        </IconButton>
                    }
                    title={profile.name}
                />
                {
                    props.photo
                        ? <CardMedia component='img' src={props.photo}/>
                        : <CardMedia component='img' src={ava}/>
                }
                <CardActions disableSpacing>
                    <Button onClick={() => history.push('/')}>Back to list</Button>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >About
                        <ExpandMoreIcon/>
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph component={'div'}>
                            <ul>
                                <li>Name:
                                    <ul>
                                        <li>{profile.name}</li>
                                    </ul>
                                </li>
                                <li> Heght:
                                    <ul>
                                        <li>{profile.height}</li>
                                    </ul>
                                </li>
                                <li>Mass:
                                    <ul>
                                        <li>{profile.mass}</li>
                                    </ul>
                                </li>
                                <li>Hair color:
                                    <ul>
                                        <li>{profile.hair_color}</li>
                                    </ul>
                                </li>
                                <li>Skin color:
                                    <ul>
                                        <li>{profile.skin_color}</li>
                                    </ul>
                                </li>
                                <li>Eyes color:
                                    <ul>
                                        <li>{profile.eye_color}</li>
                                    </ul>
                                </li>
                                <li>Birthday:
                                    <ul>
                                        <li>{profile.birth_year}</li>
                                    </ul>
                                </li>
                                <li>Gender:
                                    <ul>
                                        <li>{profile.gender}</li>
                                    </ul>
                                </li>
                                <li>Homeworld:
                                    <ul>
                                        <li>{profile.planets}</li>
                                    </ul>
                                </li>
                                <li>Vehicles:
                                    {profile.vehicle.length
                                        ? (<ul>
                                            {profile.vehicle
                                                .map((i, index) => <li key={`${i}${++index}`}>{i}</li>)}
                                        </ul>)
                                        : (<ul>
                                            <p>This person doesn't have vehicles</p>
                                        </ul>)
                                    }
                                </li>
                                <li>films
                                    <ul>
                                        {profile.film.map((i, index) => <li key={`${i}${++index}`}>{i}</li>)}
                                    </ul>
                                </li>
                            </ul>
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    )
}

let mapStateToProps = (state) => ({
    profile: state.character.profile,
    photo: state.character.profile.photo
})

export default compose(
    withRouter,
    connect(mapStateToProps, {getProfile, storePhoto})
)(ProfileContainer)
