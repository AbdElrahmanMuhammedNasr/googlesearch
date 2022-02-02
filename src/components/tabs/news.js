import * as React from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser'; 
import {Loading} from '../../UI/loading';

export const News=({searchKey})=> {
  // console.log('this is news '+searchKey)

    const [news, setNews] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {

        var options = {
            method: 'GET',
            url: 'https://google-search3.p.rapidapi.com/api/v1/news/q='+searchKey,
            headers: {
              'x-user-agent': 'desktop',
              'x-proxy-location': 'EU',
              'x-rapidapi-host': 'google-search3.p.rapidapi.com',
              'x-rapidapi-key': '1729cf9aafmshf367a549de72d3fp15224cjsnecde86e8a0bc'
            }
          };
          
          axios.request(options).then(function (response) {
              setNews(response.data.entries)
              setLoading(true)
              // console.log(response.data.entries);
          }).catch(function (error) {
              console.error(error);
          });
    },[])


  return (
    loading == false ?  <Loading/>
    :<>
    {
        news?.map(Onew=>{
          return (
            <div className="card m-3" key={Onew.id}>
            <div className="card-body">
                <p className="card-title">{Onew.title}</p>
                {/* <p className="card-text">{Onew.summary}</p> */}
                <div> { ReactHtmlParser (Onew.summary) } </div>

                <p className="card-text"><small className="text-muted">{Onew.published} by {Onew.source.title}</small></p>
            </div>
            {/* <img style={{height:'200px'}} className="card-img-bottom" src={Onew.link} alt="Card image cap"/> */}
        </div>
          )
        })
    }
    
    </>
   



  
  );
}
