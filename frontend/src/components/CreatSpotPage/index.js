import React, { useEffect, useState } from "react";
import './CreateSpotPage.css'
import { useDispatch, useSelector } from "react-redux";
import { createSpotImg, createUserSpot, getSingleSpot } from "../../store/spots";
import { useHistory } from "react-router-dom";

function CreateSpotPage() {
   const dispatch = useDispatch()

   const [country, setCountry] = useState("")
   const [state, setState] = useState("")
   const [city, setCity] = useState("")
   const [address, setAddress] = useState("")
   const [description, setDescription] = useState("")
   const [name, setName] = useState("")
   const [price, setPrice] = useState(null)
   const [previewImgUrl, setPreviewImgUrl] = useState("")
   const [imgUrls, setImgUrls] = useState([])
   const [errors, setErrors] = useState({})
   const [desError, setDesError] = useState({})
   const [nameError, setNameError] = useState({})
   const [previewImg, setPreviewImg] = useState({})
   const [img1, setImg1] = useState({})
   const [img2, setImg2] = useState({})
   const [img3, setImg3] = useState({})
   const [img4, setImg4] = useState({})
   const history = useHistory()

   let spotRes

   const handleSubmit = async (e) => {
      e.preventDefault()


      const data = {
         country,
         state,
         city,
         address,
         description,
         name,
         price
      }

      const imgArr = [
         {
            url: previewImgUrl,
            preview: true
         },
         {
            url: imgUrls[0],
            preview: false
         },
         {
            url: imgUrls[1],
            preview: false
         },
         {
            url: imgUrls[2],
            preview: false
         },
         {
            url: imgUrls[3],
            preview: false
         }
      ]


      if (description && description.length < 30) {
         setDesError({
            description: "Description needs a minimum of 30 characters"
         })
      }
      if (!description) {
         setDesError({
            description: "Description is required"
         })
      }
      if (!name) {
         setNameError({
            name: "Name is required"
         })
      }

      await dispatch(createUserSpot(data, imgArr))
         .catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) {
               setErrors(data.errors)
            }
         })
      const spotId = spotRes.id
      history.push(`/api/spots/${spotId}`)

   }
   useEffect(() => {
      dispatch(getSingleSpot(spotRes))
   }, [dispatch,])

   return (
      <div className="new-spot-page">
         <div className="form-container">
            <form onSubmit={handleSubmit}>
               <div className="address">
                  <h2>Create a New Spot</h2>
                  <h4>Where is your spot located?</h4>
                  <p>Guests will only get your exact address once they book a reservation.</p>
                  <input
                     value={country}
                     onChange={(e) => setCountry(e.target.value)}
                     type="text"
                     placeholder="Country"
                  />
                  {errors.country && (
                     <p id="error">{errors.country}</p>
                  )}
                  <input
                     id="address"
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                     type="text"
                     placeholder="Address"
                  />
                  {errors.address && (
                     <p id="error">{errors.address}</p>
                  )}
                  <div className="city-state">
                     <input
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        type="text"
                        placeholder="City"
                     />
                     <h3 id="comma">,</h3>
                     <input
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        type="text"
                        placeholder="State"
                     />
                  </div>
                  <div className="city-state-errors">
                     {errors.city && (
                        <p id="error">{errors.city}</p>
                     )}
                     {errors.state && (
                        <p id="error">{errors.state}</p>
                     )}
                  </div>
               </div>
               <div className="description">
                  <h4>Describe your place to guest</h4>
                  <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                  <div className="discription-container">
                     <textArea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please write at least 30 characters"
                     />
                  </div>
                  {desError.description && (
                     <p id="error">{desError.description}</p>
                  )}
               </div>
               <div className="title">
                  <h4>Create a title for your spot</h4>
                  <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                  <div className="name-container">
                     <input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Name of your spot"
                     />
                  </div>
                  {nameError.name && (
                     <p id="error">{nameError.name}</p>
                  )}
               </div>
               <div className="price">
                  <h4>Set a base price for your spot</h4>
                  <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                  <div className="price-container">
                     <h3 id="dollar-sign">$</h3>
                     <input
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="text"
                        placeholder="Price per night (USD)"
                     />
                  </div>
                  {errors.price && (
                     <p id="error">{errors.price}</p>
                  )}
               </div>
               <div className="photos">
                  <h4>Liven up your spot with photos</h4>
                  <p>Submit a link to at least one photo to publish your spot.</p>
                  <div className="url-input-container">
                     <input
                        className="url-input"
                        // value={previewImgUrl}
                        onChange={(e) => setPreviewImgUrl(e.target.value)}
                        type="text"
                        placeholder="Preview Image URL"
                     />
                     <input
                        className="url-input"
                        // value={img1}
                        onChange={(e) => setImgUrls([...imgUrls, e.target.value])}
                        type="text"
                        placeholder="Image URL"
                     />
                     <input
                        className="url-input"
                        // value={img2}
                        onChange={(e) => setImgUrls([...imgUrls, e.target.value])}
                        type="text"
                        placeholder="Image URL"
                     />
                     <input
                        className="url-input"
                        // value={img3}
                        onChange={(e) => setImgUrls([...imgUrls, e.target.value])}
                        type="text"
                        placeholder="Image URL"
                     />
                     <input
                        className="url-input"
                        // value={img4}
                        onChange={(e) => setImgUrls([...imgUrls, e.target.value])}
                        type="text"
                        placeholder="Image URL"
                     />
                  </div>
               </div>
               <button id="submit-button" type="submit">Create Spot</button>
            </form>
         </div>
      </div>
   )
}
export default CreateSpotPage;
