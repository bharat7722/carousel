import axios from 'axios';
import React, { useEffect, useState } from 'react'

function PixelImage() {
	const [images, setImages] = useState([]);
 
	useEffect(() => {
	  // Fetch images from the Pexels API
	  const fetchImages = async () => {
		try {
		  const response = await axios.get(
			'https://api.pexels.com/v1/search?query=people', {
			  headers: {
				'Authorization': 'RBiLiPZ7ihVFrrt1QKIZV8khN5YST0yMO38PXAZikmCz93ecVEq37J9G'
			  }
			}
		  );
		  setImages(response.data.photos);
		  console.log(response)
		} catch (error) {
		  console.error('Error fetching images:', error);
		}
	  };
   
	  fetchImages();
	}, []);
   
	return (
	  <div>
		{images.map(image => (
		  <img key={image.id} src={image.src.medium} alt={image.photographer} />
		))}
	  </div>
	);
}

export default PixelImage