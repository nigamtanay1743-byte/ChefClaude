import './App.css'
import Heading from './Heading.jsx'
import { useState } from 'react'
import Recipe from './Recipe'

function App() {

  const [ingredients, setIngredients] = useState([])
  const [showRecipe, setRecipe] = useState(false)

  const ListItems = ingredients.map(ing => (
    <li key={ing} className='Listitem'>{ing}</li>
  ))

  function handleSubmit(event) {
    event.preventDefault()
    const FormEL = event.currentTarget
    const formData = new FormData(FormEL)
    const newIngredient = formData.get("ingredient")
    if (newIngredient) {
      setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }
    FormEL.reset()
  }

  function handleRecipe() {
    setRecipe(true)
  }

  return (
    <>
    <Heading />
    <div className='main'>
      <form className='form' onSubmit={handleSubmit}>
        <input type='text' placeholder='e.g.oregano' name='ingredient' />
        <button id='button'>+ Add ingredient</button>
      </form>
      
      <div className='ingredients'>
        <p id='listhead'>Ingredients on hand:</p>
        <ul>
          {ListItems}
        </ul>
      </div>

      {ingredients.length > 0 && !showRecipe && (
        <div className='Gr'>
          <p id='GrH'>Ready for a recipe?</p>
          <p id='GrD'>Generate a recipe from your list of ingredients.</p>
          <button id='GrB' onClick={handleRecipe}>Generate Recipe</button>
        </div>
      )}
      <div>
        {showRecipe && <Recipe ingredients={ingredients} />}
      </div>     
    </div>
    </>
  )
}

export default App