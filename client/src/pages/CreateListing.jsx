import React, { useState } from "react";
import { baseUrl } from "../../url";
import "../styles/CreateListing.scss";
import { Footer, Navbar } from "../components";
import { categories, types, facilities } from "../data";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import "../styles/variable.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [amenities, setAmenitites] = useState([]);
  const [photos, setPhotos] = useState([]);

  /* Countss of guests bedrooms etc */
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  /* LOCATION */
  const [formLocation, setFormLocation] = useState({
    streetAddres: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  console.log(formLocation);

  /* Description */
  const [formDescription, setFormDescription] = useState({
    title: "",
    desc: "",
    highlight: "",
    highlightDetails: "",
    price: "",
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  console.log(formDescription);

  /* Amenities */
  const handleSelectAmenties = (facility) => {
    if (amenities.includes(facility)) {
      setAmenitites((prevAmenties) =>
        prevAmenties.filter((option) => option !== facility)
      );
    } else {
      setAmenitites((prev) => [...prev, facility]);
    }
  };

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.slice(result.source.index, 1);
    items.slice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  /* Handling the submit button */
  const creatorId = useSelector((state) => state.user._id);
  
  const navigate = useNavigate()

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const listingFormData = new FormData();
      listingFormData.append("creator", creatorId);
      listingFormData.append("category", category);
      listingFormData.append("type", type);
      listingFormData.append("streetAddres", formLocation.streetAddres);
      listingFormData.append("aptSuite", formLocation.aptSuite);
      listingFormData.append("city", formLocation.city);
      listingFormData.append("country", formLocation.country);
      listingFormData.append("province", formLocation.province);
      listingFormData.append("guestCount", guestCount);
      listingFormData.append("bedroomCount", bedroomCount);
      listingFormData.append("bathroomCount", bathroomCount);
      listingFormData.append("bedCount", bedCount);
      listingFormData.append("amenities", amenities);
      listingFormData.append("title", formDescription.title);
      listingFormData.append("desc", formDescription.desc);
      listingFormData.append("highlight", formDescription.highlight);
      listingFormData.append("highlightDetails",formDescription.highlightDetails);
      listingFormData.append("price", formDescription.price);

      /* appinding photos in the formdata */

      photos.forEach(photu => {
        listingFormData.append("listingPhotos", photu)
      })

      /* send a post request to the server */

      const response = await fetch(`${baseUrl}/properties/create`, {
        method: "post",
        body: listingFormData
      })
      if(response.ok){
        navigate('/') 
      }
    } catch (error) {
      console.log("publishing listing failes", err.message)
    }
  };

  return (
    <>
      <Navbar />

      <div className="create-listing">
        <h1>Publish Your Places</h1>
        <form onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h2>Step 1: Tell us about your places</h2>
            <br />
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
              {categories?.map((categori, index) => (
                <div
                  className={`category ${
                    category === categori.label ? "selected" : ""
                  } `}
                  key={index}
                  onClick={() => setCategory(categori.label)}
                >
                  <div className="category_icon">{categori.icon}</div>
                  <p>{categori.label}</p>
                </div>
              ))}
            </div>

            <h3>What type of place will guests have?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div
                  className={`type ${type === item.name ? "selected" : ""} `}
                  onClick={() => setType(item.name)}
                >
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icon">{item.icon}</div>
                </div>
              ))}
            </div>

            <h3>Where's your place located</h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddres"
                  value={formLocation.streetAddres}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Apartment, Suite, etc.(if applicable)</p>
                <input
                  type="text"
                  placeholder="Apartment, Suite, etc.(if applicable)"
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>City</p>
                <input
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  type="text"
                  placeholder="City"
                  name="city"
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Province</p>
                <input
                  type="text"
                  placeholder="Province"
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  onChange={handleChangeLocation}
                  value={formLocation.country}
                  required
                />
              </div>
            </div>

            <h3>Share some basics about your place</h3>
            <div className="basics">
              <div className="basic">
                <p>Guests</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() =>
                      guestCount > 1 && setGuestCount(guestCount - 1)
                    }
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "var(--pinkred)" },
                    }}
                  />
                  <p>{guestCount}</p>
                  <AddCircleOutline
                    onClick={() => setGuestCount(guestCount + 1)}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "var(--pinkred)" },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() =>
                      bedroomCount > 1 && setBedroomCount(bedroomCount - 1)
                    }
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "var(--pinkred)" },
                    }}
                  />
                  <p>{bedroomCount}</p>
                  <AddCircleOutline
                    onClick={() => setBedroomCount(bedroomCount + 1)}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "var(--pinkred)" },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Beds</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => bedCount > 1 && setBedCount(bedCount - 1)}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "var(--pinkred)" },
                    }}
                  />
                  <p>{bedCount}</p>
                  <AddCircleOutline
                    onClick={() => setBedCount(bedCount + 1)}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "var(--pinkred)" },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() =>
                      bathroomCount > 1 && setBathroomCount(bathroomCount - 1)
                    }
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "var(--pinkred)" },
                    }}
                  />
                  <p>{bathroomCount}</p>
                  <AddCircleOutline
                    onClick={() => setBathroomCount(bathroomCount + 1)}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "var(--pinkred)" },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          /* STEP TWO */
          <div className="create-listing_step2">
            <h2>Step 2: Make your place stand out</h2>
            <hr />

            <h3>Tell guests what your place has to offer</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div
                  className={`facility ${
                    amenities.includes(item.name) ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectAmenties(item.name)}
                >
                  <div className="facility_icon">{item.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>

            <h3>Add some photos of your place</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="photo"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt="place"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                  >
                                    <BiTrash />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <h3>What makes your place attractive and exciting?</h3>
            <div className="description">
              <p>Tilte</p>
              <input
                type="text"
                placeholder="Title"
                value={formDescription.title}
                onChange={handleChangeDescription}
                name="title"
                required
              />
              <p>Description</p>
              <textarea
                type="text"
                placeholder="Description"
                name="desc"
                value={formDescription.desc}
                onChange={handleChangeDescription}
                required
              />
              <p>Highlight</p>
              <input
                type="text"
                placeholder="Highlight"
                value={formDescription.highlight}
                onChange={handleChangeDescription}
                name="highlight"
                required
              />
              <p>Highlight Details</p>
              <input
                type="text"
                placeholder="Highlight Details"
                value={formDescription.highlightDetails}
                onChange={handleChangeDescription}
                name="highlightDetails"
                required
              />
              <p>Now, set the price</p>
              <span>$</span>
              <textarea
                type="number"
                placeholder="100"
                value={formDescription.price}
                onChange={handleChangeDescription}
                name="price"
                className="price"
                required
              />
            </div>
          </div>
          <button className="submit_btn" type="submit">
            Create Listing
          </button>
        </form>
      </div>
      <Footer/>
    </>
  );
};

export default CreateListing;