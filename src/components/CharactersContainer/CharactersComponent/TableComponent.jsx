import React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'

const TableComponent = ({ characters, likesId, like, dislike, redirect }) => {


        return (<>
            <TableContainer component={Paper}>
                <Table aria-label="characters">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">Homeworld</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {characters.map((character) => {
                            return (
                                <TableRow key={character.id}>
                                    <TableCell component="th" scope="row">
                                        {character.name}
                                    </TableCell>

                                    <TableCell align="right">{character.gender}</TableCell>
                                    <TableCell align="right">{character.homeworld}</TableCell>
                                    <TableCell align="right">
                                        <button onClick={() => redirect(character.id)}>View</button>
                                        {
                                            likesId.includes(character.id)

                                                ? (
                                                    <button onClick={() => dislike(character.id)}>
                                                        Dislike
                                                    </button>
                                                )
                                                : (
                                                    <button onClick={() => like(character.id)}>
                                                        Like
                                                    </button>
                                                )
                                        }
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}


export default TableComponent