
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d.ts'
import { UsersList } from './component/UsersList'

function App() {
const [users, setUsers] = useState<User[]>([])
const [showColors, setShowColors] = useState(false)
const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
const originalUsers = useRef<User[]>([])
const [filterByCountry, setFilterByCountry] = useState<string|null>(null)

const toggleColors =()=>{
  setShowColors(!showColors)
}

const toggleSortBycountry = () =>{
  const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY: SortBy.NONE
  setSorting(newSortingValue)
}

const handleDelete= ( email: string) =>{
  const filteredUsers = users.filter((user)=> user.email !== email)
  setUsers(filteredUsers)
}

const handleReset = ( ) =>{
  setUsers(originalUsers.current)
}

  useEffect(()=>{
    fetch("https://randomuser.me/api?results=100")
    .then(async res => await res.json())
    .then(res=>{
      setUsers(res.results)
      originalUsers.current= res.results
    })
    .catch(err =>{
      console.log(err)
    })
  },[])

  

  const filteredUsers = useMemo( () =>{
  return typeof filterByCountry ===  "string" && filterByCountry.length>0
  ? users.filter((user =>{
     return user.location.country.toLowerCase().includes(filterByCountry.toLowerCase())
  }))
  :users}
  ,[ users, filterByCountry])
  

  const sortedUsers = useMemo(()=>{
    return sorting=== SortBy.COUNTRY
   ? [...filteredUsers].sort(
    (a, b)=> a.location.country.localeCompare(b.location.country)
  ): filteredUsers
  },[filteredUsers,sorting])
   


 
  return (
    <>
     
    
      <p className="read-the-docs">
        Prueba
      </p> 
      <header>
        <button onClick={toggleColors}>cambiar Color</button>

        <button onClick={toggleSortBycountry}>
          { sorting=== SortBy.NONE ? "No oderndar por pais" : "ordenar por pais"}
        </button>
        <button onClick={handleReset}>Resetar datos</button>
        
        <input placeholder='Buscar Por Pais' onChange={(e)=>[
          setFilterByCountry(e.target.value)
        ]}/>
      </header>
      <main>
        <UsersList deleteUser={handleDelete} showColors={showColors} users={sortedUsers}/>
      </main>
     

    </>
  )
}

export default App
