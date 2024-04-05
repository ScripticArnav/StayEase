import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {HomePage, LoginPage, CreateListing, RegisterPage, ListingDetail, TripList, WishList, PropertyList, ReservationList, CategoryPage, SearchPage} from "./pages/index"


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/create-listing' element={<CreateListing/>} />
      <Route path='/properties/:listingId' element={<ListingDetail/>} />
      <Route path='/properties/category/:category' element={<CategoryPage/>} />
      <Route path='/properties/search/:search' element={<SearchPage/>} />
      <Route path='/:userId/trips' element={<TripList/>} />
      <Route path='/:userId/wishList' element={<WishList/>} />
      <Route path='/:userId/properties' element={<PropertyList/>} />
      <Route path='/:userId/reservations' element={<ReservationList/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
