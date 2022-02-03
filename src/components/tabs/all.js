import React from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import {Loading} from '../../UI/loading';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useSearchParams} from "react-router-dom";

 export const All =({searchKey})=>{
    // console.log('this is all '+searchKey)

    let [searchParams, setSearchParams] = useSearchParams();


    const [allNews, setAllNews] = React.useState([]);
    const [images, setImages] = React.useState([]);

    const [loading, setLoading] = React.useState(false);


// / detect changes

    // console.log(searchParams.get("searchig")    )


    React.useEffect(() => {
        setLoading(false)

        const options = {
            method: 'GET',
            url: 'https://google-search3.p.rapidapi.com/api/v1/search/q='+searchKey,
            headers: {
              'x-user-agent': 'desktop',
              'x-proxy-location': 'EU',
              'x-rapidapi-host': 'google-search3.p.rapidapi.com',
              'x-rapidapi-key': '1729cf9aafmshf367a549de72d3fp15224cjsnecde86e8a0bc'
            }
          };
          
          axios.request(options)
           .then(function (response) {
            setAllNews(response.data.results)

            // to get images 
            
            const options1 = {
                method: 'GET',
                url: 'https://google-search3.p.rapidapi.com/api/v1/images/q='+searchKey,
                headers: {
                'x-user-agent': 'desktop',
                  'x-proxy-location': 'EU',
                'x-rapidapi-host': 'google-search3.p.rapidapi.com',
                'x-rapidapi-key': '1729cf9aafmshf367a549de72d3fp15224cjsnecde86e8a0bc'
                }
            };
            
            axios.request(options1).then(function (response) {
                setImages(response.data.image_results);
                // console.log(response.data.image_results)
                //   console.log(response.data.image_results);
                setLoading(true)

            }).catch(function (error) {
                console.error(error);
            })
            // end


            //    console.log(response.data.results);
            }).catch(function (error) {
              console.error(error);
            })


            



    },[searchParams.get("searchig")] )

    

    return (
        loading  === false ? <Loading/>
        :<>
        {/* <p className='text-muted'> About {allNews.total} results ({allNews.ts} seconds)</p> */}

        <div className="row">
                <div className="col-8">
                    {
                    allNews?.map(oneNew=>{
                        return (
                            <div style={{'width':'100%'}} key={uuidv4()}>
                            <div style={{backgroundColor:'#f1f1f1',margin :"10px",padding:'15px',overflow:'hidden'}}>
                                <p>{oneNew.link}</p>
                                    <a href={oneNew.link} style={{'fontWeight':'normal',color:'blue', fontSize:'20px'}}>{oneNew.title}</a>
                                <p className='text-muted'>{oneNew.description}</p>
                                {
                    
                                    oneNew.additional_links.map((links)=>(
                                                <a href={links.href} style={{margin:"10px"}}>{links.text.split(' ')[0]}</a>
                                    ))

                                }
                            </div>
                        </div>
                        
                        )
                    
                    })
                    }
                </div>


                <div className="col-2">
                    <ImageList  sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
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
                </div>
            
        </div>
        
            </>
     
       
        )
    
}
