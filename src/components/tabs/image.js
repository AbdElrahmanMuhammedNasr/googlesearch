import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {Loading} from '../../UI/loading';
import axios from 'axios'

export  const Images=({searchKey})=> {
    const [images, setImages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {

        var options = {
            method: 'GET',
            url: 'https://google-search3.p.rapidapi.com/api/v1/images/q='+searchKey,
            headers: {
              'x-user-agent': 'desktop',
            //   'x-proxy-location': 'EU',
              'x-rapidapi-host': 'google-search3.p.rapidapi.com',
              'x-rapidapi-key': '1729cf9aafmshf367a549de72d3fp15224cjsnecde86e8a0bc'
            }
          };
          
          axios.request(options).then(function (response) {
              setImages(response.data.image_results);
            //   console.log(response.data.image_results[0]['image']['src']);
            setLoading(true)
          }).catch(function (error) {
              console.error(error);
          });

    },[])


  return (

    loading == false ? <Loading/>
    :
    
    <ImageList  variant="woven" cols={10} gap={8}>
       {
                    images?.map(image => {
                        return (
                            <ImageListItem key={image.image.src}>
                            <img
                            src={image.image.src}
                            alt={image.image.alt}
                            loading="lazy"
                            />
                        </ImageListItem>
                        )
                    } )
                    }
  </ImageList>
  );
}


