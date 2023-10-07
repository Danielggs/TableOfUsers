import { type User } from "../types.d"


interface Props{
    users: User[]
    showColors: boolean
    deleteUser: (email: string) => void
}

export function UsersList({deleteUser, users,showColors}:Props){
    return(
        <table width="100%">
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Pais</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {
                    users.map((user, index)=>{
                        const backgroundColor = index%2 === 0? "#333":"#555"
                        const color = showColors ? backgroundColor: "transparent"
                        return(
                            <tr key={index} style={{backgroundColor: color}}>
                                <td>
                                    <img src={user.picture.thumbnail}/>
                                </td>
                                <td>
                                    {user.name.first}
                                </td>
                                <td>
                                    {user.name.last}
                                </td>
                                <td>
                                    {user.location.country}
                                </td>
                                <td>
                                    <button onClick={()=>{
                                        deleteUser(user.email)
                                    }} >Borrar</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}