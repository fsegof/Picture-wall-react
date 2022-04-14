import React, { useState, useEffect } from 'react';
import {Wrapper, Column, Image, Button, Options,SwitchInput, SwitchLabel, SwitchSlider, InputLabel, RangeSlider} from './styledComponents';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [pageCount, setpageCount] = useState(2);
  const [options, setOptions] = useState({
	   grayscale: false,
	   blur: 0
  });


const handleGrayscale = (event) => {
	event.persist();
	setOptions((options) => ({
		...options,
		grayscale: event.target.checked,
	}));
};

const handleBlur = (event) => {
	event.persist();
	setOptions((options) => ({
		...options,
		blur: event.target.value,
	}));
};

  useEffect(() => {
    fetch("https://picsum.photos/v2/list/")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const createURL = (url) => {

    const decreaseImageSize = url.split("/");
    const percentageDecreased = (800/decreaseImageSize[5])
    decreaseImageSize[5] = 800;
    decreaseImageSize[6] = Math.round((decreaseImageSize[6]*percentageDecreased));

    url = decreaseImageSize.join("/")

    if(options.grayscale === true){
      url += '?grayscale';
    }
    if(options.grayscale === true && options.blur > 0){
      url += '&blur=' + options.blur;
    }
    if(options.grayscale === false && options.blur > 0){
      url += '?blur=' + options.blur;
    }
    return url;
  }
  const fetchMoreData = () => {
    fetch("https://picsum.photos/v2/list/?page="+pageCount+"")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(items.concat(result));
          setpageCount(pageCount + 1)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Wrapper>
        <Options>
          <InputLabel>Black & White Mode:</InputLabel>
          <SwitchLabel>
          <SwitchInput
            id = "grayscale"
            type="checkbox"
            name = "grayscale"
            onChange={handleGrayscale}
          />
        <SwitchSlider></SwitchSlider>
        </SwitchLabel>
        <InputLabel>Blur:</InputLabel>
          <RangeSlider
            id="blur"
            type="range"
            min="1"
            max="10"
            defaultValue="0"
            onChange={handleBlur}
          />
      </Options>
        <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
        <ResponsiveMasonry
          columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
          >
          <Masonry gutter = {10}>
        {items.map(item => (
          <Column key={item.id}>
            <Image src={createURL(item.download_url)}/>
          </Column>
        ))}
          </Masonry>
        </ResponsiveMasonry>
        </InfiniteScroll>
      </Wrapper>
    );
  }
}

export default App;
